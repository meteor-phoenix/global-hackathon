HTTP.methods({
  '/api/:orgName/:repoName/issues': {
    post: function (data) {
      // TODO ignoring pings for now, but they should be
      // logged in the GithubHooks collection to say that
      // the hook was properly set up
      if ( this.requestHeaders['x-github-event'] === 'ping' ) {
        // nothing for now
      } else {
        var orgName,
            repoName,
            number,
            title,
            pullRequest,
            githubIssue,
            githubEvent,
            createGithubIssueCommand,
            updateGithubIssueCommand;

        orgName     = this.params.orgName;
        repoName    = this.params.repoName;
        number      = data.issue.number;
        title       = data.issue.title;
        pullRequest = data.issue.pull_request;

        createGithubIssueCommand = new CreateGithubIssueCommand();
        createGithubIssueCommand.handle(
            orgName,
            repoName,
            number,
            title,
            pullRequest
        );

        githubEvent = {
          event: data.action
        };

        if ( data.issue.user && data.issue.user.login ) {
          githubEvent.actor = {
            login: data.issue.user.login
          };
        }

        githubIssue = GithubIssues.findOne( {
          orgName: orgName,
          repoName: repoName,
          number: "" + number
        } );

        updateGithubIssueCommand = new UpdateGithubIssueCommand();
        updateGithubIssueCommand.handle(githubIssue, githubEvent);
      }

      return '';
    }
  }
});
