UserVotes = new Mongo.Collection("UserVotes");

UserVotes.attachSchema(
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
    number: {
      type: String,
      label: "Github Issue Number",
      max: 200
    },
    username: {
      type: String,
      label: "Github User Name",
      max: 200
    }
  })
);


UserVotes.allow({
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

  Meteor.publish( 'userVotes', function () {
    'use strict';

    if (! this.userId) {
      return;
    }

    var user = Meteor.users.findOne(this.userId);

    var username = user.services.github.username;

    // TODO paginate
    return UserVotes.find({
      username: username
    });
  } );
}
