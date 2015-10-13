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

    return <div className="container">
      <div className="row">
        <div className="col-md-offset-3 col-md-6">
          <RepoListComponent
            repos={this.data.repos}/>
        </div>
      </div>
    </div>
  }
});
