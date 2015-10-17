// Set up login services
Meteor.startup(function() {
  // Add GitHub configuration entry
  ServiceConfiguration.configurations.update(
    { "service": "github" },
    {
      $set: {
        "clientId": Meteor.settings.github.key,
        "secret": Meteor.settings.github.secret
      }
    },
    { upsert: true }
  );

  /**
   * Publish everyone's github id
   *
   * Careful! DON'T ACCIDENTLY EXPOSE
   * SECRET PROPERTIES
   */
  Meteor.publish(null, function() {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        'services.github.username': 1
      }
    });
  });
});
