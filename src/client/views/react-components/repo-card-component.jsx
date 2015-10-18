RepoCardComponent = React.createClass({
  render() {
    var link = "/g/" + this.props.repo.orgName + "/" + this.props.repo.repoName;

    return <a
        href={link}
        className="list-group-item" key={this.props.key}>
      <h4 className="list-group-item-heading">
        {this.props.repo.orgName}&nbsp;/&nbsp;
        {this.props.repo.repoName}
      </h4>
      <p class="list-group-item-text">
        {this.props.repo.getNumberOfIssues()} Issues Open
      </p>
    </a>
  }
});