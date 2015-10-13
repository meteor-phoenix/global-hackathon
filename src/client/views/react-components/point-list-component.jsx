PointListComponent = React.createClass({
  render() {
    return <div>
      <div className="list-group">
        {this.props.points.map(function(point, i){
          return <PointCardComponent point={point} key={i} />;
        })}
      </div>
    </div>
  }
});