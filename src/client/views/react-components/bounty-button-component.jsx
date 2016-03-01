BountyButtonComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleUsers      = Meteor.subscribe("users");
    var handleUserPoints = Meteor.subscribe("userPointsByName", this.props.username);

    var points = UserPoints.find({
      username: Meteor.user().services.github.username
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
      points: points,
      totalPoints: totalPoints
    }
  },

  hasEnoughPoints() {
    if ( this.data && this.data.totalPoints ) {
      return this.data.totalPoints > 100;
    } else {
      return false;
    }
  },

  handleClick(e) {
    e.preventDefault();

    Meteor.call(
      'addBounty',
      this.props.issue.orgName,
      this.props.issue.repoName,
      this.props.issue.number
    );
  },

  render() {
    var hasEnoughPoints = this.hasEnoughPoints();

    if ( ! hasEnoughPoints || this.props.issue.closedBy !== false ) {
      return <span></span>;
    }

    return (
      <button className="btn btn-primary" onClick={this.handleClick}>
        Add +100 Bounty
      </button>
    );
  }  
});
