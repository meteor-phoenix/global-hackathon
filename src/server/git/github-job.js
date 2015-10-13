/**
 * Github Job
 *
 * For each github organization, ask for the latest issues
 * and then run a diff between the changes. For those changes,
 * run any necessary events.
 *
 * TODO look into Github hooks: https://developer.github.com/v3/repos/hooks/
 */

var github = new GitHub({
  version: "3.0.0"
});

github.authenticate({
    type: "oauth",
    key: Settings.github.key,
    secret: Settings.github.secret
})

function getIssues( github, repo ) {
  try {
    var result = github.issues.repoIssues({
      user: repo.orgName,
      repo: repo.repoName,
      state: 'all'
    });

    // Foreach issue in res
    for ( var i = 0; i < result.length; i++ ) {
      var issue = result[i];

      var githubIssue = GithubIssues.findOne( {
        orgName: repo.orgName,
        repoName: repo.repoName,
        number: "" + issue.number
      } );

      if ( githubIssue == null ) {
        var id = GithubIssues.insert( {
          orgName: repo.orgName,
          repoName: repo.repoName,
          closedBy: false,
          points: 0,
          number: issue.number,
          title: issue.title,
          isPullRequest: issue.pull_request ? true : false
        } );

        githubIssue = GithubIssues.findOne( {
          _id: id
        } );
      }

      getEventsForIssue( github, repo, githubIssue );
    }
  } catch ( e ) {
    console.log( e );
  }
}

function getEventsForIssue( github, repo, githubIssue ) {
  try {
    var result = github.issues.getEvents({
      header : {
        'If-Modified-Since': repo.lastPollTimeStamp
      },
      user: repo.orgName,
      repo: repo.repoName,
      number: githubIssue.number
    });

    // TODO we only really care about closed events
    // for now 
    for ( var i = 0; i < result.length; i++ ) {
      var githubEvent = result[i];
      // update with is closed and who closed it
      if ( githubEvent.event === 'closed' &&
           githubIssue.closedBy != githubEvent.actor.login ) {

        githubIssue.closedBy = githubEvent.actor.login;

        GithubIssues.update( githubIssue._id, {
          $set : {
            closedBy: githubIssue.closedBy
          }
        } );

        // Award the points for the issue to the user that closed it
        if ( githubIssue.points > 0 ) {
          UserPoints.insert({
            username: githubEvent.actor.login,
            message: "+" + githubIssue.points + " EXP collected from \"" + githubIssue.title + "\"",
            points: githubIssue.points
          });
        }

        UserPoints.insert({
          username: githubEvent.actor.login,
          message: "+10 EXP for closing \"" + githubIssue.title + "\"",
          points: 10
        });
      }
    }
  } catch ( e ) {
    console.log( e );
  }
}

function updateRepoPoll( repo ) {
  // Update the repo with the latest timestamp
  repo.lastPollTimestamp = +new Date();
  GithubRepos.update( repo._id, {
    $set : {
      lastPollTimestamp : repo.lastPollTimestamp
    }
  } );
}

function GithubJob () {
  // Get ALL projects
  var repos = GithubRepos.find({}).fetch();

  for ( var i = 0; i < repos.length; i++ ) {
    var repo = repos[i];

    getIssues( github, repo );
    updateRepoPoll( repo );
  }
}

// Run once
GithubJob();

// TODO use a priority queue and work through the job queue
// prioritizing active repos and refresh requests
Meteor.setInterval( GithubJob, 5 * 60 * 1000 /* 5 minutes */ );
