RepoListComponent = React.createClass({
  render() {
    return <div>
      Repo List

      <div>
        {this.props.repos.map(function(repo, i){
          return <RepoCardComponent repo={repo} key={i} />;
        })}
      </div>
    </div>
  }
});