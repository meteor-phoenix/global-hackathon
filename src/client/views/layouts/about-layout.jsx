AboutLayout = React.createClass({
  render() {
    return (
      <div>
        <div className="about__hero">
          <div className="about__hero__title">
            <h1>About Hook Quest</h1>
          </div>
          <div className="about__hero__subtitle">
            <h3>Making bug fixes fun</h3>
          </div>
        </div>
        <div className="about__content container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <p>
                The Hook Queue project started out as a very simple idea
                during the Meteor Phoenix Hackathon 2015:
              </p>
              <blockquote>
                Let&#39;s take issues from Github, assign points to them based
                on their difficulty, and then award those points to whoever
                closes the issue.
              </blockquote>
              <p>
                The hackathon attendees began working away at the core of the
                application. After an additional two weeks of work, a fully
                functioning prototype of what would come to be known as 
                Hook Quest emerged.
              </p>
              <h3>Technologies</h3>
              <p>
                <img
                  className="img-responsive"
                  src="https://cdn.rawgit.com/mantaray-ar-side-projects/hook-quest-static/0.0.3/images/made-with-meteor-compressed.png" />
              </p>
              <p>
                The project is built on Github&#39;s public API. Without Github,
                there wouldn&#39;t be a project! So special shout out to them!
              </p>
              <p>
                We&#39;d also like to thank Meteor for providing a framework and
                package ecosystem which helped us speed up our development, and
                continues to help us today.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});