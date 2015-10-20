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
            <h1><TAP label="app_name" /></h1>
          </div>
          <div className="home__hero__subtitle">
            <h3>Close Issues, Get Points, Level Up</h3>
          </div>
          <div className="home__hero__action_items">
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-md-offset-2 col-sm-6">
                  <a
                    className="btn btn-block btn-primary"
                    href="/activity">
                    View Recent Activity
                  </a>
                </div>
                <div className="col-md-3 col-md-offset-2 col-sm-6">
                  <a
                    className="btn btn-block btn-primary"
                    href="/search">
                    Search Repos and Issues
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home__content container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <RepoListComponent
                repos={this.data.repos}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
