IssueReopenedEventStrategy = (function () {
  var _rollbackPointsCommand = new RollbackPointsCommand();

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
  }

  return {
    execute: execute
  }
});