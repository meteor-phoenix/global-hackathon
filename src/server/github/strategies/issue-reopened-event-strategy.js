IssueReopenedEventStrategy = (function () {
  var _rollbackPointsCommand = new RollbackPointsCommand();
  var _updateGithubActivityCommand = new UpdateGithubActivityCommand();

  var execute = function (issue, event) {
    _rollbackPointsCommand.handle({
      username: issue.closedBy,
      orgName: issue.orgName,
      repoName: issue.repoName,
      number: issue.number
    });

    GithubIssues.update( issue._id, {
      $set : {
        closedBy: false
      }
    } );

    _updateGithubActivityCommand.handle(issue.orgName, issue.repoName);
  }

  return {
    execute: execute
  }
});