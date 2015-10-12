// Set up login services
Meteor.startup(function() {
  // Add GitHub configuration entry
  ServiceConfiguration.configurations.update(
    { "service": "github" },
    {
      $set: {
        "clientId": Settings.github.key,
        "secret": Settings.github.secret
      }
    },
    { upsert: true }
  );
});