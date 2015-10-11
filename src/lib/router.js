FlowRouter.route('/', {
    // do some action for this route
    action: function(params, queryParams) {
      console.log("Params:", params);
      console.log("Query Params:", queryParams);
      ReactLayout.render("MainLayout");
    },

    name: "Main Layout" // optional
});
