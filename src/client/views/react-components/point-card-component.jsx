PointCardComponent = React.createClass({
  render() {
    return <div
        className="list-group-item" key={this.props.key}>
      <h4 className="list-group-item-heading">
        {this.props.point.message}
      </h4>
    </div>
  }
});