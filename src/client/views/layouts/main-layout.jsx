MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleRepos  = Meteor.subscribe("githubRepos");
    var handleIssues = Meteor.subscribe("githubIssues");

    return {
      listLoading: ! handleIssues.ready() && ! handleRepos.ready(),
      repos: GithubRepos.find().fetch(),
      issues: GithubIssues.find({
        orgName: this.props.orgName,
        repoName: this.props.repoName,
      }).fetch()
    };
  },
  render() {
    if (this.data.listLoading) {
      return <AppLoadingComponent />;
    }

    return <div>
      <header>
        Menu
      </header>
      <main>
        <RepoListComponent
          repos={this.data.repos}/>
        <IssueListComponent
          issues={this.data.issues}/>
      </main>
      <footer>
        Made by Meteor Phoenix <a href="http://github.com/meteor-phoenix/global-hackathon">View on Github</a>
      </footer>
    </div>
  }
});
