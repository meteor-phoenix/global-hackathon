FlowRouter.route('/', {
  action: function(params, queryParams) {
    console.log("Params:", params);
    console.log("Query Params:", queryParams);
    ReactLayout.render(HomeLayout);
  },
  name: "Home Layout"
});

FlowRouter.route('/:orgName/:repoName', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      orgName: params.orgName,
      repoName: params.repoName
    });
  },
  name: "Issue Layout"
});
