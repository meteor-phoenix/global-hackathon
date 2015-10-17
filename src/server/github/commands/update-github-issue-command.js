UpdateGithubIssueCommand = (function () {
  var _eventStrategyFactory = new EventStrategyFactory();

  var handle = function (githubIssue, githubEvent) {
    var strategy;

    strategy = _eventStrategyFactory.build(githubEvent.event);
    if ( strategy ) {
      strategy.execute(githubIssue, githubEvent);
    }
  }

  return {
    handle: handle
  }
});