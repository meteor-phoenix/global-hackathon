HTTP.methods({
  '/api/:orgName/:repoName/badge': {
    get: function(data) {
      var orgName, repoName, style, label, color,
          url, result,
          repo, totalPoints;

      orgName = this.params.orgName;
      repoName = this.params.repoName;
      style = this.query.style || 'flat';
      label = 'EXP';
      color = 'blue';

      if ( ['flat', 'plastic', 'flat-square'].indexOf(style) === -1 ) {
        style = 'flat';
      }

      repo = GithubRepos.findOne({
        orgName: orgName,
        repoName: repoName
      });

      totalPoints = repo.getTotalPoints();

      url = "https://img.shields.io/badge/";
      url += label;
      url += "-";
      url += totalPoints;
      url += "-";
      url += color;
      url += ".svg?";
      url += 'style=' + style;

      result = HTTP.get(url);

      this.setStatusCode(result.statusCode);
      this.setContentType(result.headers['content-type']);

      return result.content;
    }
  },
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

        updateGithubActivityCommand = new UpdateGithubActivityCommand();
        updateGithubActivityCommand.handle(orgName, repoName);
      }

      return '';
    }
  }
});
