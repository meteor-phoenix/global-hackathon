GithubRepos = new Mongo.Collection("GithubRepos");

GithubRepos.attachSchema(
  new SimpleSchema({
    orgName: {
      type: String,
      label: "Organization Name",
      max:200
    },
    repoName: {
      type: String,
      label: "Repository Name",
      max:200
    },
    lastPollTimestamp: {
      type: Number,
      label: "Time Events Last Polled" 
    }
  })
);

