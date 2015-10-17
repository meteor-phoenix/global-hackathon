Meteor.methods({
  createRepo : function ( repo ) {
    check(repo, String);

    if (! Meteor.userId()) {
      throw new Meteor.Error("not-logged-in", "Must be logged in to post a comment.");
    }

    // Get the user's oauth token
    var user = Meteor.user();

    if ( user == null ) {
      throw new Meteor.Error("no-user", "You must be logged in.");
    }

    var token = user.services.github.accessToken;

    if ( token == null ) {
      throw new Meteor.Error("no-token", "No access token provided?");
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

    var command = new CreateGithubRepoCommand();

    command.handle(
        split[0], // Org/User name
        split[1], // Repo name
        token
    );

    return true;
  }
});