IssueClosedEventStrategy = (function () {
  var _awardPointsCommand = new AwardPointsCommand();

  var execute = function (issue, event) {
    // We only care about this if the issue's closer
    // is different than the event's closer:
    if (issue.closedBy != event.actor.login) {
      var username = event.actor.login;

      GithubIssues.update( issue._id, {
        $set : {
          closedBy: username
        }
      } );

      if ( issue.points > 0 ) {
        _awardPointsCommand.handle({
          username: username,
          message: "+" + issue.points + " EXP collected from \"" + issue.title + "\"",
          points: issue.points,
          orgName: issue.orgName,
          repoName: issue.repoName,
          number: issue.number
        });
      }

      _awardPointsCommand.handle({
        username: username,
        message: "+10 EXP for closing \"" + issue.title + "\"",
        points: 10,
        orgName: issue.orgName,
        repoName: issue.repoName,
        number: issue.number
      });
    }
  }

  return {
    execute: execute
  }
});