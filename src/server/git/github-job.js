/**
 * Github Job
 *
 * For each github organization, ask for the latest issues
 * and then run a diff between the changes. For those changes,
 * run any necessary events.
 */

var github = new GitHub({
  version: "3.0.0"
});

github.authenticate({
    type: "oauth",
    key: Settings.github.key,
    secret: Settings.github.secret
})

function getIssues( github, repo ) {
  console.log( repo );
    github.issues.repoIssues({
      user: repo.orgName,
      repo: repo.repoName,
      state: 'all'
    }, function ( error, message ) {
      if ( ! error ) {
        console.log( message );
      } else {
        console.log( 'error', e );
      }
    } );

    // Foreach issue in res

    // Check if we have the issue
    
    // If we do not, add the issue to the database

}


function getEvents( github, repo ) {
  try {
    var result = github.issues.getEvents({
      header : {
        'If-Modified-Since': repo.lastPollTimeStamp
      },
      user: repo.orgName,
      repo: repo.repoName,
      number: 100
    });

    // Foreach event is res

    // Send an event off that an issue was closed
    console.log(result);

    // Update the repo with the latest timestamp
    repo.lastPollTimeStamp = +new Date();
    GithubRepo.update( repo._id, repo );
  } catch ( e ) {
    console.log( e );
  }
}

function GithubJob () {
  // Get ALL projects
  var repos = GithubRepo.find({}).fetch();

  for ( var i = 0; i < repos.length; i++ ) {
    var repo = repos[i];

    getIssues( github, repo );
    //getEvents( github, repo );
  }
}

// Run once
GithubJob();

Meteor.setInterval( GithubJob, 60 * 1000 /* 1 minute */ );
