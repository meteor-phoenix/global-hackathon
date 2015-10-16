createGithubHook = function( orgName, repoName ) {
  var _token = null;
  var github;

  var _check = function () {
    // Must be logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-logged-in", "Must be logged in to post a comment.");
    }

    // Get the user's oauth token
    var user = Meteor.user();

    if ( user == null ) {
      throw new Meteor.Error("no-user", "You must be logged in.");
    }

    token = user.services.github.accessToken;

    if ( token == null ) {
      throw new Meteor.Error("no-token", "No access token provided?");
    }
  }

  var _connect = function () {
    // Connect to github
    github = new GitHub({
      version: "3.0.0"
    });

    github.authenticate({
        type: "oauth",
        token: token
    });
  }

  var _addToQueue = function () {
    JobQueue.insert({
      orgName: orgName,
      repoName: repoName,
      type: 'github',
      action: 'organization',
      recurring: true,
      lastRanTimestamp: 0
    });
  }

  var _addToHooks = function () {
    GithubHooks.insert({
      orgName: orgName,
      repoName: repoName,
      active: true
    });
  }

  var _getIssues = function () {
    var result = github.issues.repoIssues({
      user: orgName,
      repo: repoName,
      state: 'all'
    });

    // Foreach issue in res
    for ( var i = 0; i < result.length; i++ ) {
      var issue = result[i];

      makeIssue(
          orgName,
          repoName,
          issue.number,
          issue.title,
          issue.pull_request
      );
    }
  }

  var _makeHook = function () {
    // Ask github to make a hook
    var failed = true;
    try {
      var response = github.repos.createHook({
        user: orgName,
        repo: repoName,
        name: 'web',
        config: {
          'url': Settings.domain + '/api/' + orgName + '/' + repoName + '/issues',
          'content_type': 'json'
        },
        events: ['issues'],
        active: true
      });

      failed = false;
    } catch(e) {
      // Don't worry if the hook is already set
      if ( e.errors && e.errors[0] && e.errors[0].message
        && e.error[0].message == "Hook already exists on this repository" ) {
        failed = false;
      } else {
        console.log(e);
        failed = true;  
      }
    }

    if ( failed ) {
      // If the hook fails, we will add the repo
      // to the job queue
      _addToQueue();
    } else {
      // Add the repo to the list of hooks we have
      _addToHooks();
    }
  }

  _check();
  _connect();
  _makeHook();
  _getIssues();
}
