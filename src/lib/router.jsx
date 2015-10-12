FlowRouter.route('/', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <HomeLayout />
    });
  },
  name: "Home Layout"
});

FlowRouter.route('/login', {
  action: function (params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <LoginLayout />
    });
  },
  name: "Login Layout"
});

FlowRouter.route('/:orgName/:repoName', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      orgName: params.orgName,
      repoName: params.repoName,
      content: <NestedLayout orgName={params.orgName} repoName={params.repoName} />
    });
  },
  name: "Issue Layout"
});
