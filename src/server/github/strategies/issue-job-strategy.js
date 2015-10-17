/**
 * Run the business logic for completing
 * an issue job from the job queue
 */
IssueJobStrategy = (function (githubConnection) {
  var _getIssueEventsCommand;

  _getIssueEventsCommand    = new GetIssueEventsCommand();

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
    var page             = job.page || 0;
    var lastRanTimestamp = job.lastRanTimestamp;

    // TODO refactor this to the get-issue-events-command
    var page = _getIssueEventsCommand.handle(
        orgName,
        repoName,
        number,
        githubConnection,
        page,
        lastRanTimestamp
    );

    // TODO update the job with the given page
  };

  return {
    execute: execute
  }
});
