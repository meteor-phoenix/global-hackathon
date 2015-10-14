RepoListComponent = React.createClass({
  newClick(e) {
    e.preventDefault();
    $('#createRepo').modal('show');
  },
  createClick(e) {
    e.preventDefault();

    var $input = $('#createRepo input[name=createRepoName]');
    var $label = $('#createRepo label[for=createRepoName]');
    var repo = $input.val();

    // Reset the form
    $input.closest( 'form' ).removeClass( 'has-error' );
    $label.text('');

    Meteor.call( 'createRepo', repo, function ( err, msg ) {
      if ( err ) {
        $input.closest( 'form' ).addClass( 'has-error' );
        $label.text( err.reason ); 
      } else {
        $('#createRepo').modal('hide');
      }
    });
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
                  <div className="form-group">
                    <label
                        className="control-label"
                        htmlFor="createRepoName">
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="createRepoName"
                        name="createRepoName"
                        placeholder="my-org-or-user-name/my-repo-name"/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.createClick}>Add Repo</button>
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