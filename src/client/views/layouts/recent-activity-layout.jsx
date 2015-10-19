RecentActivityLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleRepos  = Meteor.subscribe("githubRepos");

    return {
      listLoading: ! handleRepos.ready(),
      repos: GithubRepos.find({}, {
        sort: {
          createdAt: -1
        },
        limit: 50
      }).fetch()
    };
  },
  render() {
    var content = '';
    if (this.data.listLoading) {
      content = <AppLoadingComponent />;
    } else {
      content = <RepoListComponent
                repos={this.data.repos}/>
    }

    return (
      <div>
        <div className="activity__hero">
          <div className="activity__hero__title">
            <h1>Recently Added Repos</h1>
          </div>
        </div>
        <div className="activity__content container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
