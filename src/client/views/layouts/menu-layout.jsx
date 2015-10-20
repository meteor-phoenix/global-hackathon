MenuLayout = React.createClass({
  render() {
    return <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/"><TAP label="app_name" /></a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><a href="/activity">Activity</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/about">About</a></li>
          </ul>
          <div className="nav navbar-nav navbar-right">
            <LoginLayout />
          </div>
        </div>
      </div>
    </nav>
  }
});
