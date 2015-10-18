NestedLayout = React.createClass({
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
        },
        limit: 10
      }).fetch(),
      issues: GithubIssues.find({
        orgName: this.props.orgName,
        repoName: this.props.repoName,
      }, {
        sort: {
          closedBy: -1,
          points: -1,
          number: -1
        }
      }).fetch()
    };
  },
  render() {
    if (this.data.listLoading) {
      return <AppLoadingComponent />;
    }

    return <div className="container">
        <div className="row">
          <div className="col-md-3">
            <RepoListComponent
              repos={this.data.repos}/>
          </div>
          <div className="col-md-9">
            <IssueListComponent
              orgName={this.props.orgName}
              repoName={this.props.repoName}
              issues={this.data.issues}/>
          </div>
        </div>
      </div>
  }
});
