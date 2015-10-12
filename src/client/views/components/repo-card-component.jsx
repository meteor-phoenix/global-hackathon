RepoCardComponent = React.createClass({
  render() {
    return <div key={this.props.key}>
      {this.props.repo.orgName}&nbsp;/&nbsp;
      {this.props.repo.repoName}

      {this.props.repo.getNumberOfIssues()} Issues Open
    </div>
  }
});