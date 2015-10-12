IssueCardComponent = React.createClass({
  render() {
    var closedBy;
    var panelClass = "panel";
    var githubLink = "https://github.com/";
    githubLink += this.props.issue.orgName;
    githubLink += '/';
    githubLink += this.props.issue.repoName;
    githubLink += '/issues/';
    githubLink += this.props.issue.number;

    /*
     * Different look and text whether the issue is closed or not
     */
    if (this.props.issue.closedBy === false) {
      closedBy = <span>Open</span>
      panelClass += " panel-primary";
    } else {
      closedBy = <span>Closed by <span className="label label-primary">{this.props.issue.closedBy}</span></span>
      panelClass += " panel-info";
    }

    return <div className={panelClass} key={this.props.key}>
      <div className="panel-heading">
        <span className="pull-right">{closedBy}</span>
        <h3 className="panel-title">{this.props.issue.title}</h3>
      </div>
      <div className="panel-body">
        <a href={githubLink} className="btn btn-default" target="blank">
          View Issue On Github&nbsp;
          <i className="fa fa-external-link"></i>
        </a>

        <span className="pull-right">
          {this.props.issue.points} Exp
          &nbsp;
          <a className="fa-stack fa-lg" href="#">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-caret-up fa-stack-1x fa-inverse"></i>
          </a>
        </span>
      </div>
    </div>
  }
});