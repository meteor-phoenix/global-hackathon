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
      _jobQueueCommand;

  _githubConnection = new GitHub({ version: "3.0.0" });
  _hookCommand      = new CreateGithubHookCommand();
  _jobQueueCommand  = new AddRepoToJobQueueCommand();

  /**
   * @param orgName String the organization or user name
   * @param repoName String the repo name
   * @param token String the Meteor user's github oauth token
   */
  var handle = function (orgName, repoName, token) {
    _githubConnection.authenticate({
        type: "oauth",
        token: token
    });

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
  };

  return {
    handle: handle
  }
});
