/**
 * Create a hook to a given Github Repo
 */
CreateGithubHookCommand = (function () {
  var _issueCommand;

  _issueCommand = new GetRepoIssuesCommand();

  /**
   * Try to create a Github Hook
   *
   * If we fail to make a hook, that could mean two things:
   * - 1). The hook already exists, in which case, continue as if we made it
   * - 2). The user does not have access to the repo
   *
   * If the hook was successful, the repo's issues and events will
   * be requested immediately using the user's oauth token.
   *
   * After the hook has tried to be established, the repo is added
   * to the job queue.
   *
   * @param orgName String the organization or user
   * @param repoName String the repo name
   * @param githubConnection Github a connected instance of the Github object
   *
   * @return Boolean whether the hook failed to be added or not. True on success of hook being added
   */
  var handle = function (orgName, repoName, githubConnection) {
    var failed = true;
    var url = Settings.domain + '/api/' + orgName + '/' + repoName + '/issues';
    try {
      githubConnection.repos.createHook({
        user: orgName,
        repo: repoName,
        name: 'web',
        config: {
          'url': url,
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
        failed = true;  
      }
    }

    // We will now ask for all of the issues and their latest
    // events for this repo. We will only do this if the
    // hook was successful, because we know that we can use
    // that user's oauth token to ask for the data
    //
    // We will also store the hook in our database, just for
    // future reference.
    if ( ! failed ) {
      GithubHooks.insert({
        orgName: orgName,
        repoName: repoName,
        active: true
      });

      // get latest data for the repo using the given
      // github connection
      _issueCommand.handle(
          orgName,
          repoName,
          githubConnection,
          true /* getEvents */
      );
    }
    
    return ! failed;
  };

  return {
    handle: handle
  }
});