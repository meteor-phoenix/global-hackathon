IssueCardComponent = React.createClass({
  render() {
    return <div key={this.props.key}>
      Issue

      {this.props.issue.title}
      {this.props.issue.closedBy}
      {this.props.issue.points}
    </div>
  }
});