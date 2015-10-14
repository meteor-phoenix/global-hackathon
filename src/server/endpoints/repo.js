Meteor.methods({
  createRepo : function ( repo ) {
    check(repo, String);

    if (! Meteor.userId()) {
      throw new Meteor.Error("not-logged-in", "Must be logged in to post a comment.");
    }

    var split = repo.split( '/' );

    if ( split.length !== 2 ) {
      throw new Meteor.Error("incorrect-syntax", "You must provide a \"user-name/repo-name\" or \"org-name/repo-name\".");
    }

    // Check if the repo alrady exists
    var alreadyExists = GithubRepos.findOne({
      orgName: split[0],
      repoName: split[1]
    });

    if ( alreadyExists ) {
      throw new Meteor.Error("already-exists", "That repo already exists.");
    }

    // Add the repo to the list
    GithubRepos.insert({
      orgName: split[0],
      repoName: split[1],
      lastPollTimestamp: 0
    });

    return true;
  }
});