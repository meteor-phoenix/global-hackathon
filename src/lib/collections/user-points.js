UserPoints = new Mongo.Collection("UserPoints");

UserPoints.attachSchema(
  new SimpleSchema({
    points: {
      type: Number,
      label: "Number of Points the User Has",
      max: 200
    },
    username: {
      type: String,
      label: "Github User Name",
      max: 200
    },
    message: {
      type: String,
      label: "How did the user get the points?",
      max: 500
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


UserPoints.allow({
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

  Meteor.publish( 'userPoints', function () {
    'use strict';

    if (! this.userId) {
      return;
    }

    var user = Meteor.users.findOne(this.userId);

    var username = user.services.github.username;

    // TODO paginate
    return UserPoints.find({
      username: username
    });
  } );

  Meteor.publish( 'userPointsByName', function (username) {
    'use strict';

    // TODO paginate
    return UserPoints.find({
      username: username
    });
  });
}
