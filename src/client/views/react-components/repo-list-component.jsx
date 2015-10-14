RepoListComponent = React.createClass({
  newClick(e) {
    e.preventDefault();
    // TODO
    $('#createRepo').modal('show');
  },
  render() {
    var addRepoButton = '';
    var addRepoModal  = '';

    if ( Meteor.userId() ) {
      addRepoButton = (
        <button className="pull-right btn btn-primary" onClick={this.newClick}>
          <i className="fa fa-plus"></i>
        </button>
      );

      addRepoModal = (
        <div className="modal fade" id="createRepo" tabindex="-1" role="dialog" aria-labelledby="createRepoModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="createRepoModalLabel">Add a repo</h4>
              </div>
              <div className="modal-body">
                <form>
                  <div class="form-group">
                    <input type="text" className="form-control" id="createRepoName" placeholder="my-org-or-user-name/my-repo-name"/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Add Repo</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>
      {addRepoButton}
      {addRepoModal}
      <h3>Repos</h3>

      <div className="list-group">
        {this.props.repos.map(function(repo, i){
          return <RepoCardComponent repo={repo} key={i} />;
        })}
      </div>
    </div>
  }
});