MainLayout = React.createClass({
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
    return <div>
      <header>
        Menu
      </header>
      <main>
        <RepoListLayout
          repos={this.data.repos}/>
        <IssueListLayout/>
      </main>
      <footer>
        Made by Meteor Phoenix <a href="http://github.com/meteor-phoenix/global-hackathon">View on Github</a>
      </footer>
    </div>
  }
});
