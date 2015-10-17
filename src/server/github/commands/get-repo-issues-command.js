/**
 * Get a repo's issues from Github
 */
GetRepoIssuesCommand = (function () {
  var _createIssueCommand,
      _getIssueEventsCommand;

  _createIssueCommand    = new CreateGithubIssueCommand();
  _getIssueEventsCommand = new GetIssueEventsCommand();

  /**
   * Get all of the issues for a repo
   *
   * @param orgName String the organization or user name
   * @param repoName String the repo name
   * @param githubConnection Github a connected instance of the Github object
   * @param getEvents Boolean Optional whether to get the events for each issue. Defaults false
   *
   * @return Mixed the results from the query
   */
  var handle = function (orgName, repoName, githubConnection, getEvents ) {
    getEvents = getEvents || false;

    // TODO repo issues are paginated, just like issue events
    var result = githubConnection.issues.repoIssues({
      user: orgName,
      repo: repoName,
      state: 'all'
    });

    // Foreach issue in res
    for ( var i = 0; i < result.length; i++ ) {
      var issue = result[i];

      // Add the issue if it does not exist
      var _id = _createIssueCommand.handle(
          orgName,
          repoName,
          issue.number,
          issue.title,
          issue.pull_request
      );

      if ( getEvents && _id ) {
        _getIssueEventsCommand.handle(
            orgName,
            repoName,
            issue.number,
            githubConnection
        );
      }
    } // end for loop

    return result;
  };

  return {
    handle: handle
  }
});