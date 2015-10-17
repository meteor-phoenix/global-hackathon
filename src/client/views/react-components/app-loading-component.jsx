AppLoadingComponent = React.createClass({
  render() {
    var fun = [
        "Calculating levels...",
        "Awarding medals of honor...",
        "Hunting for unicorns...",
        "Crunching skill levels...",
        "Finding quests...",
      ];
    fun.sort(function () { return 0.5 - Math.random(); });

    var message = fun[0];

    var text = (
      <div id="loader-pitch">
        <h1>Loading</h1>
        <h2>{message}</h2>
      </div>
    );
    if (this.props.noText) {
      text = '';
    }

    return <div className="loading">
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
      {text}
    </div>
  }
});