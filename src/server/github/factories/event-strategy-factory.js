EventStrategyFactory = (function () {
  var build = function (type) {
    var strategy = null;

    switch(type) {
      case 'opened':
        strategy = new IssueOpenedEventStrategy();
        break;
      case 'closed':
        strategy = new IssueClosedEventStrategy();
        break;
      case 'reopened':
        strategy = new IssueReopenedEventStrategy();
        break;
      // case 'assigned':
      //   strategy = new IssueAssignedEventStrategy();
      //   break;
      // case 'head_ref_deleted':
      //   strategy = new BranchDeletedEventStrategy();
      //   break;
    }

    return strategy;
  }
  return {
    build: build
  }
});