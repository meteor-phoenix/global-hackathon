IssueListComponent = React.createClass({
  render() {
    return <div>
      <RepoInfoComponent
            orgName={this.props.orgName}
            repoName={this.props.repoName} />
      <p>Close issues, get points, and level up!</p>

      <div>
        {this.props.issues.map(function(issue, i){
          return <IssueCardComponent issue={issue} key={i} />;
        })}
      </div>
    </div>
  }
});
