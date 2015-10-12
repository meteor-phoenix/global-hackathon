IssueListComponent = React.createClass({
  render() {
    return <div>
      Issue List

      <div className="list-group">
        {this.props.issues.map(function(issue, i){
          return <IssueCardComponent issue={issue} key={i} />;
        })}
      </div>
    </div>
  }
});
