HomeLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleRepos  = Meteor.subscribe("githubRepos");
    var handleIssues = Meteor.subscribe("githubIssues");

    return {
      listLoading: ! handleIssues.ready() && ! handleRepos.ready(),
      repos: GithubRepos.find().fetch()
    };
  },
  render() {
    if (this.data.listLoading) {
      return <AppLoadingComponent />;
    }

    return <div>
      <header>
        <h1>Welcome to the Github Gamified Issue Tracker</h1>
        <p>Fix some issues and get sweet points</p>
      </header>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <RepoListComponent
                repos={this.data.repos}/>
            </div>
          </div>
        </div>
      </main>
      <footer>
        Made by Meteor Phoenix <a href="http://github.com/meteor-phoenix/global-hackathon">View on Github</a>
      </footer>
    </div>
  }
});
