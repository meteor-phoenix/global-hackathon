MainLayout = React.createClass({
  render() {
    return <div>
      <header>
        Menu
      </header>
      <main>
        <RepoListLayout/>
        <IssueListLayout/>
      </main>
      <footer>
        Made by Meteor Phoenix <a href="http://github.com/meteor-phoenix/global-hackathon">View on Github</a>
      </footer>
    </div>
  }
});
