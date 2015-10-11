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
    console.log("Params:", params);
    console.log("Query Params:", queryParams);
    ReactLayout.render(MainLayout);
  },
  name: "Issue Layout"
});

// FlowRouter.route("/", {
//   subscriptions: function() {
//     var selector = {category: {$ne: "private"}};
//     this.register('posts', Meteor.subscribe('posts', selector));
//   },
//   action: function() {
//     ReactLayout.render(BlogLayout, {
//       content: <PostList />
//     });
//   }
// });