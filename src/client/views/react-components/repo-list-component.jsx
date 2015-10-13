RepoListComponent = React.createClass({
  render() {
    return <div>
      <h3>Repos</h3>

      <div className="list-group">
        {this.props.repos.map(function(repo, i){
          return <RepoCardComponent repo={repo} key={i} />;
        })}
      </div>
    </div>
  }
});