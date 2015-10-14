UserLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleUsers      = Meteor.subscribe("users");
    var handleUserPoints = Meteor.subscribe("userPointsByName", this.props.username);

    var user = Meteor.users.findOne({
      'services.github.username': this.props.username
    });

    var points = UserPoints.find({
      username: this.props.username
    }, {
      sort: {
        createdAt: -1  
      }
    }).fetch();

    var totalPoints = 0;

    if ( points.length > 0 ) {
      totalPoints = points.map(function ( a ) {
        return a.points;
      } ).reduce(function ( a, b ) {
        return a + b;
      });
    }

    return {
      user: user,
      points: points,
      totalPoints: totalPoints
    }
  },
  render() {
    return <div className="container">
      <div className="row">
        <div className="col-md-offset-3 col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{this.data.user.services.github.username}</h3>
            </div>
            <div className="panel-body">
              <p>Total EXP: <span className="label label-primary">{this.data.totalPoints}</span></p>

              <PointListComponent points={this.data.points} />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
});
