IssueCardComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleUserVotes  = Meteor.subscribe("userVotes");

    return {
      listLoading: ! handleUserVotes.ready(),
      vote: UserVotes.findOne({
        orgName: this.props.issue.orgName,
        repoName: this.props.issue.repoName,
        number: this.props.issue.number
      })
    };
  },
  voteClick( e ) {
    e.preventDefault();
    // TODO unvote if already voted
    // TODO handle error

    if ( this.data.vote ) {
      var result = Meteor.call(
        'uncastVote',
        this.props.issue.orgName,
        this.props.issue.repoName,
        this.props.issue.number
      );
    } else {
      var result = Meteor.call(
        'castVote',
        this.props.issue.orgName,
        this.props.issue.repoName,
        this.props.issue.number
      );
    }
  },
  render() {
    var closedBy;
    var panelClass = "panel";
    var voteClass  = "fa fa-circle fa-stack-2x";
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
      var closerLink = "/" + this.props.issue.closedBy;
      closedBy = (
        <span>
          Closed by 
          &nbsp;
          <a href={closerLink}>
            <span className="label label-primary">
              {this.props.issue.closedBy}
            </span>
          </a>
        </span>
      );
      panelClass += " panel-info";
    }

    /*
     * Different look for whether the vote has been cast or not
     */
    if (this.data.vote) {
      voteClass += " text-primary";
    } else {
      voteClass += " text-muted";
    }

    return <div className={panelClass} key={this.props.key}>
      <div className="panel-heading">
        <span className="pull-right">{closedBy}</span>
        <h3 className="panel-title">
          #{this.props.issue.number} &nbsp; 
          {this.props.issue.title}</h3>
      </div>
      <div className="panel-body">
        <div className="fluid-container">
          <div className="row">
            <div className="col-xs-3">
              <a className="fa-stack fa-lg" href="#" onClick={this.voteClick}>
                <i className={voteClass}></i>
                <i className="fa fa-caret-up fa-stack-1x fa-inverse"></i>
              </a>
              &nbsp;
              {this.props.issue.points} Exp
            </div>
            <div className="col-xm-9">
              <a href={githubLink} className="btn btn-default" target="blank">
                View Issue On Github&nbsp;
                <i className="fa fa-external-link"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
});