/**
 * Exports various utilities for communicating with GitHub using the official
 * Octokit client library.
 */
const { Octokit } = require('@octokit/rest');
const logger = require('winston');

/**
 * Creates a repository given a name, using the supplied token to authenticate.
 *
 * @note the token encapsulates security credentials for a specific user, so
 * explicitly identifying a user for repository creation is not necessary.
 *
 * @see the supported tokens for authentication:
 *     https://octokit.github.io/rest.js/v18#authentication
 *
 * @param name name of the repository to create
 * @param token any form of access token (PAT, OAuth AT, etc.)
 */
async function createRepoOrReturn(name, token) {
  const octokit = new Octokit({ auth: token });
  try {
    await octokit.rest.repos.createForAuthenticatedUser({
      name,
      description: 'GitHub Pages site configured by Researchify.',
      private: false,
      auto_init: true,
      license_template: 'mit',
    });
    logger.info(`Repo ${name} created successfully.`);
  } catch (err) {
    if (err.status === 422) {
      // This repo already exists, skip forward.
      return;
    }
    throw new Error(`Failed to create repo ${name}: ${err.message}.`);
  }
}

/**
 * Configures a supplied repository to be GitHub pages-compatible.
 *
 * @param owner owner of the repository
 * @param repoName name of the repository needing GitHub pages configuration
 * @param token any form of access token (PAT, OAuth AT, etc.)
 */
async function configurePagesForRepo(owner, repoName, token) {
  const octokit = new Octokit({ auth: token });
  try {
    await octokit.rest.repos.createPagesSite({
      owner,
      repo: repoName,
      source: {
        branch: 'main',
        path: '/',
      },
    });
    logger.info(`Pages successfully configured for repo ${repoName}.`);
  } catch (err) {
    if (err.status === 409) {
      // Pages is already configured for this repo, skip forward.
      return;
    }
    throw new Error(
      `Failed to configure Pages for repo ${repoName}: ${err.message}.`,
    );
  }
}

/**
 * Manually triggers a GitHub Pages build for a configured repository.
 *
 * @note we generally don't need to call this explicitly, but it can be used for
 * debugging purposes.
 *
 * @param owner owner of the repository
 * @param repoName name of the repository needing a manual build
 * @param token any form of access token (PAT, OAuth AT, etc.)
 */
async function forcePagesBuild(owner, repoName, token) {
  const octokit = new Octokit({ auth: token });
  try {
    await octokit.rest.repos.requestPagesBuild({
      owner,
      repo: repoName,
    });
    logger.info(`Pages build has been queued for ${repoName}.`);
  } catch (err) {
    throw new Error(
      `Failed trying to force Pages build for repo: ${repoName}: ${err.message}.`,
    );
  }
}

module.exports = {
  createRepoOrReturn,
  configurePagesForRepo,
  forcePagesBuild,
};
