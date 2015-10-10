GithubRepo = new Mongo.Collection("GithubRepo");

Schemas = {}

Schemas.Github = new SimpleSchema({
  orgName: {
    type: String,
    label: "Organization Name"
    max:200
  },
  repoName: {
    type: String,
    label: "Repository Name"
    max:200
  },
  lastPollTimestamp: {
    type:Boolean,
    label: "Time Events Last Polled" 
  }
})

GithubRepo.attachSchema(Shemas.Github)

