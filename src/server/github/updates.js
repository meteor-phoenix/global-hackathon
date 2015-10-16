handleIssue = function(params, data) {
  console.log( 'handling issue' );
  var orgName  = params.orgName;
  var repoName = params.repoName;
  var number   = data.issue.number;
  var title    = data.issue.title;
  var pullRequest = data.issue.pull_request

  makeIssue(
      orgName,
      repoName,
      number,
      title,
      pullRequest
  );

  JobQueue.insert({
    orgName: orgName,
    repoName: repoName,
    number: number,
    type: 'github',
    action: 'issue',
    recurring: false,
    lastRanTimestamp: 0
  });

  var githubEvent = {
    event: data.action
  };

  if ( data.issue.user && data.issue.user.login ) {
    githubEvent.actor = {
      login: data.issue.user.login
    };
  }

  var githubIssue = GithubIssues.findOne( {
    orgName: orgName,
    repoName: repoName,
    number: "" + number
  } );

  // TODO if closed or open
  updateIssue(
      githubIssue,
      githubEvent
  );
}

makeIssue = function(orgName, repoName, number, title, pullRequest) {
  var githubIssue = GithubIssues.findOne( {
    orgName: orgName,
    repoName: repoName,
    number: "" + number
  } );

  if ( githubIssue == null ) {
    GithubIssues.insert( {
      orgName: orgName,
      repoName: repoName,
      closedBy: false,
      points: 0,
      number: "" + number,
      title: title,
      isPullRequest: pullRequest ? true : false
    } );
  }
}

closeIssue = function (githubIssue, githubEvent) {
  githubIssue.closedBy = githubEvent.actor.login;

  GithubIssues.update( githubIssue._id, {
    $set : {
      closedBy: githubIssue.closedBy
    }
  } );

  // Award the points for the issue to the user that closed it
  if ( githubIssue.points > 0 ) {
    UserPoints.insert({
      username: githubEvent.actor.login,
      message: "+" + githubIssue.points + " EXP collected from \"" + githubIssue.title + "\"",
      points: githubIssue.points,
      orgName: githubIssue.orgName,
      repoName: githubIssue.repoName,
      number: githubIssue.number
    });
  }

  UserPoints.insert({
    username: githubEvent.actor.login,
    message: "+10 EXP for closing \"" + githubIssue.title + "\"",
    points: 10,
    orgName: githubIssue.orgName,
    repoName: githubIssue.repoName,
    number: githubIssue.number
  });
}

reopenIssue = function (githubIssue, githubEvent) {
  // Award the points for the issue to the user that closed it
  UserPoints.remove({
    username: githubIssue.closedBy,
    orgName: githubIssue.orgName,
    repoName: githubIssue.repoName,
    number: githubIssue.number
  });

  githubIssue.closedBy = false;

  GithubIssues.update( githubIssue._id, {
    $set : {
      closedBy: githubIssue.closedBy
    }
  } );
}

updateIssue = function(githubIssue, githubEvent) {
  // update with is closed and who closed it
  if ( githubEvent.event === 'closed' &&
       githubIssue.closedBy != githubEvent.actor.login ) {

    closeIssue( githubIssue, githubEvent );
  } else if ( githubEvent.event === 'reopened' ) {
    reopenIssue( githubIssue, githubEvent );
  }
}