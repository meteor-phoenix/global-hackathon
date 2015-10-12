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
      type: "String|Boolean",
      label: "Issue was closed by",
      max:200
    },
    title: {
      type: String,
      label: "Title of the issue"
    },
    points: {
      type: Number,
      label: "Number of points issue is worth"
    },
    number: {
      type: String,
      label: "Github Issue Number",
      max: 200
    },
    isPullRequest : {
      type: Boolean,
      label: "Whether this issue is a pull request"
    }
  })
);


GithubIssues.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  }
});


// ==================
// Publish Properties
// ==================
if ( Meteor.isServer ) {
  // TODO define any views here

  Meteor.publish( 'githubIssues', function (orgName, repoName) {
    'use strict';

    return GithubIssues.find({});
  } );
}
