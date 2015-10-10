if ( process.env.prod ) {
  Migration.add( '1444518891-repo-seed-data', function () {
    GithubRepo.add({
      orgName: 'meteor-phoenix',
      repoName: 'global-hackathon'
    });
  });
}
