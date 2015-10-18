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
    key: Meteor.settings.github.key,
    secret: Meteor.settings.github.secret
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

Meteor.setInterval( runJob, Meteor.settings.job.interval );
