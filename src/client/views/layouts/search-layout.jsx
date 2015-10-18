SearchLayout = React.createClass({
  mixins: [ReactMeteorData],
  componentDidMount() {
    $('#searchBox').focus();
  },
  getInitialState() {
    return {message: ''};
  },
  handleChange(e) {
    this.setState({message: e.target.value});
  },
  getMeteorData() {
    var handleRepos  = Meteor.subscribe("githubRepos");

    return {
      listLoading: ! handleRepos.ready(),
      repos: GithubRepos.find({
        $or: [{
          orgName: {
            $regex: '.*' + this.state.message + ".*"
          }
        }, {
          repoName: {
            $regex: '.*' + this.state.message + ".*"
          }
        }]
      }, {
        sort: {
          createdAt: -1
        },
        limit: 50
      }).fetch()
    };
  },
  render() {
    var content = '';
    if (this.data.listLoading) {
      content = <AppLoadingComponent />;
    } else {
      content = <RepoListComponent
                repos={this.data.repos}
                noText={true}/>
    }

    var message = this.state.message;

    return (
      <div>
        <div className="search__hero">
          <div className="search__hero__title">
            <h1>Search for Repos</h1>
          </div>
        </div>
        <div className="search__content container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <input
                id="searchBox"
                autofocus="true"
                placeholder="Search..."
                className="input form-control"
                type="text"
                value={message}
                onChange={this.handleChange} />
            </div>
            <div className="col-md-6 col-md-offset-3">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
