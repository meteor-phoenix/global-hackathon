RepoListComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      loggedIn: ( Meteor.userId() ) ? true : false
    };
  },
  createRepo() {
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
  newClick(e) {
    e.preventDefault();
    $('#createRepo').modal('show');
  },
  createSubmit(e) {
    e.preventDefault();

    this.createRepo();
  },
  createClick(e) {
    e.preventDefault();

    this.createRepo();
  },
  render() {
    var addRepoButton = '';
    var addRepoModal  = '';

    if ( this.data.loggedIn ) {
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
                <form id="createRepoForm" onSubmit={this.createSubmit}>
                  <p>
                    We currently only support public repos. When you add a repo, it
                    will be added to the queue.
                  </p>
                  <p>
                    New repos may take a bit of time to populate, please be patient.
                  </p>
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
      <h4>Active</h4>

      <div className="list-group">
        {this.props.repos.map(function(repo, i){
          return <RepoCardComponent repo={repo} key={i} />;
        })}
      </div>
    </div>
  }
});