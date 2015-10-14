// TODO some how tie the reactivity of
// GithubRepos to GithubIssues

/**
 * GithubRepo Object
 */
GithubRepo = function (doc) {
  _.extend(this, doc);
};

GithubRepo.prototype = {
  constructor: GithubRepo,

  getNumberOfIssues: function () {
    var issues = GithubIssues.find({
      orgName: this.orgName,
      repoName: this.repoName,
      closedBy: false
    });

    return issues.count();
  }
};

/**
 * GithubRepos Mongo Collection
 */
GithubRepos = new Mongo.Collection("GithubRepos", {
  transform: function(doc) {
    return new GithubRepo(doc);
  }
});

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
    },
    createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();  // Prevent user from supplying their own value
        }
      }
    }
  })
);

GithubRepos.allow({
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

  Meteor.publish( 'githubRepos', function () {
    'use strict';

    // TODO paginate
    return GithubRepos.find({});
  } );
}
