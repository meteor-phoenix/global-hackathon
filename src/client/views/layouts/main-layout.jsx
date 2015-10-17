MainLayout = React.createClass({
  render() {
    return <div>
      <header>
        <a className="sr-only" href="#top" name="top" id="top">&nbsp;</a>
        <MenuLayout />
      </header>
      <main>
        {this.props.content}
      </main>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">

              <ul className="list-unstyled">
                <li className="pull-right"><a href="#top">Back to top</a></li>
                <li><a href="/about">About</a></li>
              </ul>
              <p>Made by Meteor Phoenix.</p>
              <p><a href="http://github.com/meteor-phoenix/global-hackathon">View on Github</a>.</p>
              <p>Code released under the <a href="http://github.com/meteor-phoenix/global-hackathon/blob/master/LICENSE">MIT License</a>.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  }
});
