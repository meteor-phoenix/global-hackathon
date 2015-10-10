/**
 * Github Job
 *
 * For each github organization, ask for the latest issues
 * and then run a diff between the changes. For those changes,
 * run any necessary events.
 */

var github;

function getConnection () {
  var github = new GitHub({
    version: "3.0.0",
    timeout: 5000
  });
}

function GithubJob () {
  if (github === null) {
    github = getConnection();
  }

  // Get ALL projects
  var repos = GithubRepo.find({});

  while ( repos.hasNext() ) {
    var repo = repos.next();

    github.issues.getAll({}, function (err, res) {
      // TODO

      // Foreach issue in res

      // Check if we have the issue
      
      // If we do not, add the issue to the database

      console.log(JSON.stringify(res));
    });

    github.issues.getEvents({
      header : {
        'If-Modified-Since': repo.lastPollTimeStamp
      },
      user: repo.orgName,
      repo: repo.repoName,
      number: 100
    }, function(err, res) {
      // TODO

      // Foreach event is res

      // Send an event off that an issue was closed
      console.log(JSON.stringify(res));
    });

    // Update the repo with the latest timestamp
    repo.lastPollTimeStamp = +new Date();
    GithubRepo.update( repo._id, repo );
  }
}

// Run once
GithubJob();

Meteor.setInterval( GithubJob, 60 * 1000 /* 1 minute */ );
