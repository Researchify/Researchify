/**
 * Exports configuration necessary for users to authorize with GitHub OAuth, so
 * that our API server can be communicated with to deploy the client's website
 * to GitHub Pages.
 *
 * Note: process.env.NODE_ENV will be automatically set to 'production' when
 * building; see:
 * https://create-react-app.dev/docs/adding-custom-environment-variables/
 */

/// We require access to the "repo" scope to allow pushing to the pages repo.
export const scope = 'repo';
/// Configured client ID of the GitHub OAuth application.
export let githubClientId;

// Values depend on whether we're running in dev mode or prod.
if (process.env.NODE_ENV === 'production') {
  githubClientId = 'bf0b026536ac6923e06e';
} else {
  githubClientId = '0a58958e33b392f837b6';
}


