UpdateGithubActivityCommand = (function () {
  var handle = function (org, repo) {
    GithubRepos.update( {
      orgName: org,
      repoName: repo
    }, {
      $set: {
        lastActivityTimestamp: +new Date()
      }
    } );
  };

  return {
    handle: handle
  }
});


      
