LoginLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleUserPoints = Meteor.subscribe("userPoints");

    var pointEntries = UserPoints.find({
      // nothing
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch();

    var points = 0;

    if ( pointEntries.length > 0 ) {
      points = pointEntries.reduce(function ( a, b ) {
        return a.points + b.points;
      });
    }

    return {
      points: points,
      loggedIn: ( Meteor.userId() ) ? true : false
    };
  },
  render() {
    var experienceBadge = "";

    if ( this.data.loggedIn ) {
      var badgeLink = "/" + Meteor.user().services.github.username;
      experienceBadge = (
        <a href={badgeLink} className="label label-primary">
          {this.data.points} EXP
        </a>
      );
    }

    return <div>
      {experienceBadge}
      &nbsp;
      <IncludeTemplate template={Template._loginButtons} />
      
    </div>
  }
});
