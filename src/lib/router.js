FlowRouter.route('/:org_name/:repo_name', {
    // do some action for this route
    action: function(params, queryParams) {
      console.log("Params:", params);
      console.log("Query Params:", queryParams);
      BlazeLayout.render("mainLayout", {area: "blog"});
    },

    name: "Testing this route" // optional
});
