/**
 * Exports configuration necessary to communicate with Scholly to deploy
 * a client website to GitHub Pages.
 */
require('dotenv').config();

/// Hostname of the scholly service.
let schollyHost;
/// Client ID of the configured GitHub OAuth application.
let githubClientId;

// Values depend on whether we're running in dev mode or prod (in containers).
if (process.env.NODE_ENV === 'production') {
  schollyHost = 'http://scholly:8000';
  githubClientId = 'bf0b026536ac6923e06e';
} else {
  schollyHost = 'http://localhost:8000';
  githubClientId = '0a58958e33b392f837b6';
}

// Client secret of the configured GitHub OAuth application.
const githubClientSecret = process.env.GH_CLIENT_SECRET;

module.exports = {
  githubClientId,
  githubClientSecret,
  schollyHost,
};
