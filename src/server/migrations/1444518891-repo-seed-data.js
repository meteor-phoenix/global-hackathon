if ( ! process.env.prod ) {
  Migrations.add( '1444518891-repo-seed-data', function () {
    GithubRepo.insert({
      orgName: 'meteor-phoenix',
      repoName: 'global-hackathon',
      lastPollTimestamp: 0
    });
  });
}
