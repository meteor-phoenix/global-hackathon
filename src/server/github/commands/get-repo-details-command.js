GetRepoDetailsCommand = (function () {
  var handle = function (orgName, repoName, githubConnection) {
    var result = githubConnection.repos.get({
      user: orgName,
      repo: repoName
    });

    return result;
  }

  return {
    handle: handle
  }
});
