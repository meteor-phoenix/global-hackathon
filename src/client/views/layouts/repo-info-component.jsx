RepoInfoComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var orgName  = this.props.orgName;
    var repoName = this.props.repoName;

    badgeLink = Meteor.settings.public.domain;
    badgeLink += "/api/";
    badgeLink += orgName;
    badgeLink += "/";
    badgeLink += repoName;
    badgeLink += "/badge";

    // TODO some central command should take care of this
    var linkToRepo = Meteor.settings.public.domain;
    linkToRepo += "/g/";
    linkToRepo += orgName;
    linkToRepo += "/";
    linkToRepo += repoName;

    return {
      badgeLink: badgeLink,
      linkToRepo: linkToRepo
    };
  },
  badgeInfo(e) {
    e.preventDefault();
    $('#badgeInfo').modal('show');
  },
  render() {

    var badgeMarkdown = "[![Hook Quest Experience](";
    badgeMarkdown += this.data.badgeLink;
    badgeMarkdown += " \"Experience up for grabs\")](";
    badgeMarkdown += this.data.linkToRepo;
    badgeMarkdown += ")";

    return (
    <div>
      <div className="repo__info">
        <a href="#" onClick={this.badgeInfo}>
          <img
            src={this.data.badgeLink} />
        </a>
      </div>

      <div className="modal fade" id="badgeInfo" tabindex="-1" role="dialog" aria-labelledby="badgeInfoModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="badgeInfoModalLabel">Badge Info</h4>
            </div>
            <div className="modal-body">
              <h4>Markdown</h4>
              <pre>
                <code>
                  {badgeMarkdown}
                </code>
              </pre>

              <h4>Raw Image Url</h4>
              <pre>
                <code>
                  {this.data.badgeLink}
                </code>
              </pre>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
});
