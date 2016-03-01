Meteor.methods({
  addBounty : function ( orgName, repoName, issueNumber ) {
    check(orgName, String);
    check(repoName, String);

    if (! Meteor.userId()) {
      throw new Meteor.Error("not-logged-in", "Must be logged in to add bounties.");
    }

    var user = Meteor.user();

    if ( user == null ) {
      throw new Meteor.Error("no-user", "You must be logged in.");
    }

    // add user-points of -100 for adding a bounty
    var awardPointsCommand = new AwardPointsCommand();

    var username = user.services.github.username;

    var issue = GithubIssues.findOne({
      orgName: orgName,
      repoName: repoName,
      number: issueNumber
    });

    var result = awardPointsCommand.handle({
      username: username,
      message: "-100 EXP for issuing a bounty on \"" + issue.title + "\"",
      points: -100,
      orgName: issue.orgName,
      repoName: issue.repoName,
      number: issue.number
    });

    // add 100 points to issue
    GithubIssues.update({
      orgName: orgName,
      repoName: repoName,
      number: number
    }, {
      $inc : {
        points: 100
      }
    });
  }
});