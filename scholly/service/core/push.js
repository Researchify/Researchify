/**
 * This module exports a function used to deploy the built base app to the
 * team's GitHub Pages repo.
 */
const fs = require('fs/promises');
const path = require('path');
const util = require('util');
const logger = require('winston');
const ghPages = require('gh-pages');

const { createRepoOrReturn } = require('./util/github');

const publish = util.promisify(ghPages.publish);

const PATH_TO_BASE_REACT_APP = path.join(__dirname, '..', '..', '/base');

/**
 * Takes in a user's GitHub username and their token and deploys the built
 * React base app to their GitHub Pages repository.
 *
 * @note the token must encapsulate sufficient privileges that allows repo
 * modifications. See public_repo and repo scopes:
 * https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes
 *
 * @param ghUsername GitHub username of the user whose app is being deployed
 * @param ghToken any form of a user's access token (PAT, OAuth AT, etc.)
 */
async function pushBuiltAppToPages(ghUsername, ghToken) {
  const repoName = `${ghUsername}.github.io`;
  const cloneURL = `https://${ghUsername}:${ghToken}@github.com/${ghUsername}/${repoName}.git`;

  await createRepoOrReturn(repoName, ghToken);
  try {
    await publish(`${PATH_TO_BASE_REACT_APP}/build`, {
      branch: 'main',
      repo: cloneURL,
      message: 'Deployed with Researchify :)',
      user: {
        name: 'Researchify',
        email: 'researchify@bot.com',
      },
      add: true,
    });
    logger.info(`Pages push successful for ${repoName}.`);
  } catch (err) {
    throw new Error(`Failed pages push for ${repoName}: ${err.message}.`);
  } finally {
    await cleanupBuild();
  }
}

/**
 * Utility function to remove the generated build directory after the React base
 * app has been built. We won't be requiring it anymore and can thus be removed.
 * We also clean up the cache left behind from gh-pages.
 */
async function cleanupBuild() {
  try {
    await fs.rm(`${PATH_TO_BASE_REACT_APP}/build`, {
      recursive: true,
      force: true,
    });
  } catch (err) {
    logger.error('Failed to remove built directory.');
  } finally {
    ghPages.clean();
  }
}

module.exports = pushBuiltAppToPages;
