/**
 * @see https://developer.github.com/v3/oauth/
 */
Accounts.ui.config({
  requestPermissions: {
    github: ['user', 'public_repo', 'write:repo_hook']
  }
});