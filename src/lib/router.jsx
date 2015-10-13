FlowRouter.route('/', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <HomeLayout />
    });
  },
  name: "Home"
});

FlowRouter.route('/:username', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      orgName: params.orgName,
      repoName: params.repoName,
      content: <UserLayout username={params.username} />
    });
  },
  name: "User Profile"
});

FlowRouter.route('/:orgName/:repoName', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      orgName: params.orgName,
      repoName: params.repoName,
      content: <NestedLayout orgName={params.orgName} repoName={params.repoName} />
    });
  },
  name: "Issues"
});
