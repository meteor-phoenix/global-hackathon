GithubIssues = new Mongo.Collection("GithubIssues");

GithubIssues.attachSchema(
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
    closedBy: {
      type: String,
      label: "Issue was closed by",
      max:200
    },
    points: {
      type: Number,
      label: "Number of points issue is worth"
    },
    githubId: {
      type: String,
      label: "Gibhub ID",
      max: 200
    }
  })
);

