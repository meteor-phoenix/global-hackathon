/**
 * Github Job Poll
 *
 * Ask for the oldest job. Do the job, whether it is a
 * request to get an organization's issues, or an issue's
 * events.
 */

__githubConnection = new GitHub({
  version: "3.0.0"
});

__githubConnection.authenticate({
    type: "oauth",
    key: Settings.github.key,
    secret: Settings.github.secret
});

function runJob() {
  // Go through the job queue and pick the oldest job
  var job = JobQueue.findOne({
    type: 'github'
  }, {
    sort: {
      lastRanTimestamp: 1
    }
  });

  if ( job ) {
    var jobStrategyFactory,
        jobStrategy;

    jobStrategyFactory = new JobStrategyFactory(__githubConnection);

    jobStrategy = jobStrategyFactory.build(job.action);

    jobStrategy.execute(job);

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
