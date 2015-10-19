LoginLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handleUserPoints = Meteor.subscribe("userPoints");
    var points = 0;

    if ( Meteor.user() ) {
      var pointEntries = UserPoints.find({
        username: Meteor.user().services.github.username
      }, {
        sort: {
          createdAt: -1
        }
      }).fetch();

      if ( pointEntries.length > 0 ) {
        points = pointEntries.map(function ( a ) {
          return a.points;
        } ).reduce(function ( a, b ) {
          return a + b;
        });
      }
    }

    return {
      points: points,
      loggedIn: ( Meteor.userId() ) ? true : false
    };
  },
  render() {
    var experienceBadge = "";

    if ( this.data.loggedIn && Meteor.user() ) {
      var badgeLink = "/g/" + Meteor.user().services.github.username;
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
