NestedLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleRepos  = Meteor.subscribe("githubRepos");
    var handleIssues = Meteor.subscribe("githubIssues");

    return {
      listLoading: ! handleIssues.ready() && ! handleRepos.ready(),
      repos: GithubRepos.find({}, {
        sort: {
          lastActivityTimestamp: -1,
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

    var getRepoColorCommand = new GetRepoColorCommand();
    var repoColor = getRepoColorCommand.handle(
      this.props.orgName,
      this.props.repoName
    );

    var repoStyle = {
      backgroundColor: repoColor
    };

    return (
      <div>
        <div className="repo__hero" style={repoStyle}>
          <div className="repo__hero__title">
            <h1>{this.props.orgName} / {this.props.repoName}</h1>
          </div>
        </div>
        <div className="repo__content container">
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
      </div>
    );
  }
});
