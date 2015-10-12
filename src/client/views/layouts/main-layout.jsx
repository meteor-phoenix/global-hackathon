MainLayout = React.createClass({
  render() {
    return <div>
      <header>
        <MenuLayout />
      </header>
      <main>
        {this.props.content}
      </main>
      <footer>
        Made by Meteor Phoenix <a href="http://github.com/meteor-phoenix/global-hackathon">View on Github</a>
      </footer>
    </div>
  }
});
