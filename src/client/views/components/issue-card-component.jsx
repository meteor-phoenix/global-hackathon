IssueCardComponent = React.createClass({
  render() {
    var closedBy;

    if (this.props.issue.closedBy === false) {
      closedBy = <span>Open</span>
    } else {
      closedBy = <span>Closed by <span className="label label-primary">{this.props.issue.closedBy}</span></span>
    }

    return <a href="#" className="list-group-item" key={this.props.key}>
      <h4 class="list-group-item-heading">{this.props.issue.title}</h4>
      
      <p className="list-group-item-text">
        {closedBy}
        <span className="pull-right label label-primary">{this.props.issue.points}</span>
      </p>
    </a>
  }
});