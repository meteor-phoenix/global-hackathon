/**
 * Github Job Poll
 *
 * Ask for the oldest job. Do the job, whether it is a
 * request to get an organization's issues, or an issue's
 * events.
 *
 * If the job is getting an organization's issues, ask for
 * all of the issues. For each issue returned, verify that
 * we have the correct information about the issue. For
 * each new issue, add a job for polling for it's events.
 * When done, set the job date to the latest timestamp.
 *
 * If the job is getting an issue's events, ask for the
 * latest events since the last time we polled. Apply the
 * events.
 */

 // TODO refactor this code so that it is reusable

var github = new GitHub({
  version: "3.0.0"
});

github.authenticate({
    type: "oauth",
    key: Settings.github.key,
    secret: Settings.github.secret
});

function runJob() {
  var _doRepo = function ( orgName, repoName ) {
    var result = github.issues.repoIssues({
      user: orgName,
      repo: repoName,
      state: 'all'
    });

    // Foreach issue in res
    for ( var i = 0; i < result.length; i++ ) {
      var issue = result[i];

      makeIssue(
          orgName,
          repoName,
          issue.number,
          issue.title,
          issue.pull_request
      );

      // Also add a job for this issue
      var job = JobQueue.findOne({
        orgName: orgName,
        repoName: repoName,
        number: "" + issue.number,
        type: 'github',
        action: 'issue'
      });

      if ( job == null ){
        JobQueue.insert({
          orgName: orgName,
          repoName: repoName,
          number: "" + issue.number,
          type: 'github',
          action: 'issue',
          recurring: true,
          lastRanTimestamp: 0
        });
      }
    }
  };

  var _doIssue = function ( orgName, repoName, number, lastRanTimestamp ) {
    var result = github.issues.getEvents({
      header : {
        'If-Modified-Since': lastRanTimestamp
      },
      user: orgName,
      repo: repoName,
      number: number,
      per_page: 100
    });

    var githubIssue = GithubIssues.findOne({
      orgName: orgName,
      repoName: repoName,
      number: "" + number
    });

    // TODO github lists issues in order of history:
    // earliest first, latest on the LAST page.

    // Yup, we need to ask for the LAST event on the
    // LAST page.

    // For now, we will just ask for 100 events and call it good enough

    updateIssue(githubIssue, result[result.length -1 ]);
    
  };

  // Go through the job queue and pick the oldest job
  var job = JobQueue.findOne({
    type: 'github'
  }, {
    sort: {
      lastRanTimestamp: 1
    }
  });

  if ( job ) {
    try {
      if (job.action === 'organization') {
        _doRepo( job.orgName, job.repoName );
      } else if (job.action === 'issue') {
        _doIssue( job.orgName, job.repoName, job.number, job.lastRanTimestamp );
      }
    } catch (e) {
      console.log(e);
    }

    // Once the job is finished, set the job timestamp
    // to now.
    if ( job.recurring ) {
      JobQueue.update(job._id, {
        $set : {
          lastRanTimestamp: +new Date()
        }
      });
    } else {
      JobQueue.remove({
        _id: job._id
      });
    }
  }
}


/**
 * Run the queue at once a second to say under the
 * Github API limit of 5000 requests an hour, because
 * there are 3600 seconds in an hour
 */
Meteor.setInterval( runJob, 1000 );
