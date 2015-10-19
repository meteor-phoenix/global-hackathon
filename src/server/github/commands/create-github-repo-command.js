/**
 * Create a Github Repo
 *
 * Will:
 * - Attempt to add a hook to Github
 * - Add the repo to the database
 * - Add the repo to the job queue
 */
CreateGithubRepoCommand = (function () {
  var _githubConnection,
      _hookCommand,
      _jobQueueCommand,
      _issueCommand,
      _repoDetailsCommand;

  _githubConnection   = new GitHub({ version: "3.0.0" });
  _hookCommand        = new CreateGithubHookCommand();
  _jobQueueCommand    = new AddRepoToJobQueueCommand();
  _issueCommand       = new GetRepoIssuesCommand();
  _repoDetailsCommand = new GetRepoDetailsCommand();

  /**
   * @param orgName String the organization or user name
   * @param repoName String the repo name
   * @param token String the Meteor user's github oauth token
   *
   * @return Boolean True if sucessfully created, false otherwise
   */
  var handle = function (orgName, repoName, token, language) {
    langauge = language || 'na';

    var details, data;

    _githubConnection.authenticate({
        type: "oauth",
        token: token
    });

    // See if we can't get the repo's details. If we
    // can't, then we know the repo is private, and
    // we should fail here.
    try {
      // Do this once as us
      details = _repoDetailsCommand.handle(
          orgName,
          repoName,
          __githubConnection /* global github connection */
      );
    } catch (e) {
      return false;
    }

    // Now do it authenticated as the user ASYNCRONOUSLY
    Meteor.setTimeout(function () {
      _issueCommand.handle(
          orgName,
          repoName,
          _githubConnection,
          true /* getEvents */
      );
    }, 1);

    // Add the repo to the database
    // Add the repo to the list
    var data = {
      orgName: orgName,
      repoName: repoName,
      language: 'na',
      lastPollTimestamp: 0
    };

    if ( details ) {
      data.language = details.language;
    }

    GithubRepos.insert(data);

    // Attempt to make a hook
    var hookApplied = _hookCommand.handle(orgName, repoName, _githubConnection);

    // If the hook was applied, set the lastRunTimestamp
    // to be now
    var lastRunTimestamp = 0;
    if ( hookApplied ) {
      lastRunTimestamp = +new Date();
    }

    // Add the repo to the job queue
    _jobQueueCommand.handle(orgName, repoName, lastRunTimestamp);

    return true;
  };

  return {
    handle: handle
  }
});
