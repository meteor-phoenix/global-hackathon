FlowRouter.route('/', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <HomeLayout />
    });
  },
  name: "Home"
});

FlowRouter.route('/about', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <AboutLayout />
    });
  },
  name: "About"
});

FlowRouter.route('/search', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <SearchLayout />
    });
  },
  name: "Search"
});

FlowRouter.route('/activity', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <RecentActivityLayout />
    });
  },
  name: "Recent Activity"
});

FlowRouter.route('/g/:username', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      orgName: params.orgName,
      repoName: params.repoName,
      content: <UserLayout username={params.username} />
    });
  },
  name: "User Profile"
});

FlowRouter.route('/g/:orgName/:repoName', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      orgName: params.orgName,
      repoName: params.repoName,
      content: <NestedLayout orgName={params.orgName} repoName={params.repoName} />
    });
  },
  name: "Issues"
});

FlowRouter.route('/test/loading', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <AppLoadingComponent />
    });
  },
  name: "Test Loading"
});

