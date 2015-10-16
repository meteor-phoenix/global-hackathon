if ( Settings.seed ) {
  Migrations.add( '1444518891-repo-seed-data', function () {
    GithubRepos.insert({
      orgName: 'meteor-phoenix',
      repoName: 'global-hackathon',
      lastPollTimestamp: 0
    });
  });
}
