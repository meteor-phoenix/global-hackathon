HTTP.methods({
  '/api/:orgName/:repoName/issues': {
    post: function (data) {
      // TODO ignoring pings for now, but they should be
      // logged in the GithubHooks collection to say that
      // the hook was properly set up
      if ( this.requestHeaders['x-github-event'] === 'ping' ) {
        // nothing for now
      } else {
        handleIssue( this.params, data );  
      }

      return '';
    }
  }
});
