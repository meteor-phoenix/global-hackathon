/**
 * Run the business logic for completing
 * an issue job from the job queue
 */
IssueJobStrategy = (function (githubConnection) {
  var _updateGithubIssueCommand = new UpdateGithubIssueCommand();
  /**
   * Execute this strategy on the given
   * issue job object. Will update its
   * own Job Database Object with with the
   * correct page of issue events we should
   * ask for next time.
   *
   * @param job Object The job data, should have
   *                   an orgName, repoName, number
   */
  var execute = function (job) {
    var orgName          = job.orgName;
    var repoName         = job.repoName;
    var number           = job.number;
    var lastRanTimestamp = job.lastRanTimestamp;

    // TODO github lists issues in order of history:
    // earliest first, latest on the LAST page.

    // Yup, we need to ask for the LAST event on the
    // LAST page.

    // For now, we will just ask for 100 events and call it good enough
    var results = githubConnection.issues.getEvents({
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

    if (githubIssue && results && results.length > 0) {
      var githubEvent = results[ results.length - 1 ];

      _updateGithubIssueCommand.handle(
          githubIssue,
          githubEvent
      );
    }
  };

  return {
    execute: execute
  }
});
