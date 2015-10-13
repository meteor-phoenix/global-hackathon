/**
 * Cast vote helper takes care of actually
 * manipulating the database to cast a vote
 */
function castVoteHelper(orgName, repoName, number, username) {
  var voteId = UserVotes.insert({
    orgName: orgName,
    repoName: repoName,
    number: number,
    username: username
  });

  GithubIssues.update({
    orgName: orgName,
    repoName: repoName,
    number: number
  }, {
    $inc : {
      points: 1
    }
  });

  return voteId;
}

/**
 * Uncast vote helper takes care of rolling
 * back a vote cast
 */
function uncastVoteHelper(orgName, repoName, number, username) {
  var voteId = UserVotes.remove({
    orgName: orgName,
    repoName: repoName,
    number: number,
    username: username
  });

  GithubIssues.update({
    orgName: orgName,
    repoName: repoName,
    number: number
  }, {
    $inc : {
      points: -1
    }
  });

  return voteId;
}

function defaultCheck(orgName, repoName, number) {
  check(orgName, String);
  check(repoName, String);

  if (! Meteor.userId()) {
    throw new Meteor.Error("not-logged-in", "Must be logged in to post a comment.");
  }

  // also check that the issue has not already been closed
  var issue = GithubIssues.findOne({
    orgName: orgName,
    repoName: repoName,
    number: number
  });

  var alreadyClosed = !( issue.closedBy === false );

  if ( alreadyClosed ) {
    return false;
  }

  return true;
}

Meteor.methods({
  castVote: function (orgName, repoName, number) {
    if ( defaultCheck(orgName, repoName, number) ) {
      var username = Meteor.user().services.github.username;

      // The user has NOT cast a vote for that issue before
      var vote = UserVotes.findOne({
        orgName: orgName,
        repoName: repoName,
        number: number,
        username: username
      });

      if ( vote == null ) {
        return castVoteHelper(orgName, repoName, number, username);  
      }
    }

    return false;
  },
  uncastVote: function (orgName, repoName, number) {
    if ( defaultCheck(orgName, repoName, number) ) {
      var username = Meteor.user().services.github.username;

      // The user has cast a vote for that issue before
      var vote = UserVotes.findOne({
        orgName: orgName,
        repoName: repoName,
        number: number,
        username: username
      });

      if ( vote != null ) {
        return uncastVoteHelper(orgName, repoName, number, username);  
      }
    }

    return false;
  }
});