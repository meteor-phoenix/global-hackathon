IssueListComponent = React.createClass({
  render() {
    return <div>
      Issue List

      <div>
        {this.props.issues.map(function(issue, i){
          return <IssueCardComponent issue={issue} key={i} />;
        })}
      </div>
    </div>
  }
});
