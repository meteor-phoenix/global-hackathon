/**
 * Create a Github Issue in the database
 */
CreateGithubIssueCommand = (function () {
  var _updateGithubActivityCommand = new UpdateGithubActivityCommand(); 
  /**
   * Will only make an issue if it does not already exist
   *
   * @param orgName String the user or organization name
   * @param repoName String the repo name
   * @param number Number|String the issue number from Github
   * @param isPullRequest Boolean whether the issue is a pull request
   */
  var handle = function(orgName, repoName, number, title, isPullRequest) {
    var githubIssue = GithubIssues.findOne( {
      orgName: orgName,
      repoName: repoName,
      number: "" + number
    } );

    if ( githubIssue == null ) {
      _updateGithubActivityCommand.handle(orgName, repoName);

      return GithubIssues.insert( {
        orgName: orgName,
        repoName: repoName,
        closedBy: false,
        points: 0,
        number: "" + number,
        title: title,
        isPullRequest: isPullRequest ? true : false
      } );
    }

    return githubIssue._id;
  };

  return {
    handle: handle
  }
});
