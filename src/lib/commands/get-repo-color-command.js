GetRepoColorCommand = (function () {
  var _langaugeColorStrategy = new LanguageColorStrategy();
  var handle = function (orgName, repoName) {
    var repo = GithubRepos.findOne({
      orgName,
      repoName
    });

    return _langaugeColorStrategy.execute(repo.language);
  }
  return {
    handle: handle
  }
});