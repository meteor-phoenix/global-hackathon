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
});
