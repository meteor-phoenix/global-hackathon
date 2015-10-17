/**
 * Run the business logic for completing
 * a repo job from the job queue
 */
RepoJobStrategy = (function (githubConnection) {
  var _issueCommand = new GetRepoIssuesCommand();

  /**
   * Execute this strategy on the given
   * repo job object. Will add jobs for
   * any new issues found
   *
   * @param job Object The job data, should have orgName and repoName
   */
  var execute = function (job) {
    var orgName  = job.orgName;
    var repoName = job.repoName;

    var results = _issueCommand.handle(
        orgName,
        repoName,
        githubConnection,
        false /* getEvents */
    );

    for ( var i = 0; i < results.length; i++ ) {
      var issue = results[i];

      var job = JobQueue.findOne({
        orgName: orgName,
        repoName: repoName,
        number: "" + issue.number,
        type: 'github',
        action: 'issue'
      });

      if ( job == null ) {
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

  return {
    execute: execute
  }
});
