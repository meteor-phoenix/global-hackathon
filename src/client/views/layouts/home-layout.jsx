HomeLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleRepos  = Meteor.subscribe("githubRepos");
    var handleIssues = Meteor.subscribe("githubIssues");

    return {
      listLoading: ! handleIssues.ready() && ! handleRepos.ready(),
      repos: GithubRepos.find({}, {
        sort: {
          lastPollTimestamp: -1,
          createdAt: -1
        }
      }).fetch()
    };
  },
  render() {
    if (this.data.listLoading) {
      return <AppLoadingComponent />;
    }

    return (
      <div>
        <div className="home__hero">
          <div className="home__hero__title">
            <h1>Hook Quest</h1>
          </div>
          <div className="home__hero__subtitle">
            <h3>Close Issues, Get Points, Level Up</h3>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <RepoListComponent
                repos={this.data.repos}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
