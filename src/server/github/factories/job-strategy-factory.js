JobStrategyFactory = (function (githubConnection) {
  var _jobStrategy;

  var build = function ( type ) {
    _jobStrategy = null;
    switch( type ) {
    case 'repo':
      _jobStrategy = new RepoJobStrategy(githubConnection);
      break;
    case 'issue':
      _jobStrategy = new IssueJobStrategy(githubConnection);
      break;
    }
    
    return _jobStrategy;
  }

  return {
    build: build
  }
});
