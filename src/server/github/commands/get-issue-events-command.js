/**
 * Get the latest event for the given issue
 */
GetIssueEventsCommand = (function() {
  var _updateGithubIssueCommand;

  _updateGithubIssueCommand = new UpdateGithubIssueCommand();

  var handle = function (orgName, repoName, number, githubConnection, page, lastRanTimestamp) {
    page = page || 0;
    lastRanTimestamp = lastRanTimestamp || 0;

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

    // TODO return the next page number if there is one
    return 0;
  }

  return {
    handle: handle
  }
});