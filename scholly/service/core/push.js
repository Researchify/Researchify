/**
 * This module exports a utility function used to deploy the built base up
 * to the team's GitHub Pages repo.
 */ /* eslint-disable no-console */
const ghpages = require('gh-pages');
const logger = require('winston');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const PATH_TO_BASE_REACT_APP = path.join(__dirname, '..', '..', '/base');

/**
 * This function takes in a user's GitHub username and their PAT and deploys the built React base app to
 * their GitHub pages repository.
 *
 * @param ghUsername the GitHub username of the account the app needs to be deployed to.
 * @param ghToken the Personal Access Token (PAT) of the user's account with push permissions.
 * @throws Error if the push failed.
 */
async function pushBuiltAppToPages(ghUsername, ghToken, repoName) {
  logger.info(ghUsername);
  logger.info(ghToken);
  await makeGHRepo(ghUsername, ghToken, repoName);
  await ghpages.publish(
    `${PATH_TO_BASE_REACT_APP}/build`,
    {
      branch: 'main',
      repo: `https://${ghUsername}:${ghToken}@github.com/${ghUsername}/${ghUsername}.github.io.git`,
      message: 'Deployed with Researchify :)',
      user: {
        name: 'Researchify',
        email: 'researchify@bot.com',
      },
    },
    (err) => {
      if (err) {
        logger.error(
          `Failed to push built app to GitHub Pages for ${ghUsername}`,
          err,
        );
        throw err;
      } else {
        logger.info(`Successfully deployed app for ${ghUsername}`);
      }
      cleanupBuild();
    },
  );
  await buildPages(ghUsername, ghToken, repoName);
}

/**
 * Utility function to remove the generated build directory after the React base app has been built.
 * We won't be requiring it anymore and can thus be removed.
 */
function cleanupBuild() {
  fs.rm(`${PATH_TO_BASE_REACT_APP}/build`, { recursive: true }, (err) => {
    if (err) {
      logger.error('Failed to remove built directory.');
    }
  });
}

async function makeGHRepo(ghUsername, ghToken, repoName) {
  // check if the repo exists
  const searchQuery = `q=user:${ghUsername} ${repoName} in:name`;
  const options = {
    Authorization: `token ${ghToken}`,
    Accept: 'application/vnd.github.v3+json',
  };

  let repoExists;
  try {
    const repoResponse = await axios.get(
      `https://api.github.com/search/repositories?${searchQuery}`,
      {
        headers: options,
      },
    );
    repoExists = repoResponse.data.total_count === 1;
  } catch (err) {
    if (err.response.status !== 422) {
      // Error 422 is fine (it can be caused by user having no repo or only private ones in their account), any other should be thrown back up.
      throw err;
    }
    logger.info(
      `${ghUsername} does not have any repositories, creating one for GH pages...`,
    );
    repoExists = false;
  }

  if (!repoExists) {
    // User does not have a repo for github pages, let's create it
    const createRepoBody = {
      name: repoName,
      private: false, // free accounts can only use a public repo for GH pages
      auto_init: true,
    };
    try {
      await axios({
        url: 'https://api.github.com/user/repos',
        method: 'post',
        headers: options,
        data: createRepoBody,
      });
      logger.info('Repo was created successfully');
    } catch (err) {
      logger.error(err);
    }
  }

  // set up pages for the repo regardless of whether its new or not
  // see https://docs.github.com/en/rest/reference/repos#pages
  try {
    await axios.get(
      `https://api.github.com/repos/${ghUsername}/${repoName}/pages`,
      {
        headers: {
          Authorization: `token ${ghToken}`,
          Accept: 'application/vnd.github.switcheroo-preview+json',
        },
      },
    );
    logger.info('GH Pages already configured for repo');
  } catch (err) {
    logger.info('GH pages not created yet');
    createPagesSite(ghUsername, ghToken, repoName);
  }
}

async function createPagesSite(ghUsername, ghToken, repoName) {
  const pagesBody = {
    source: {
      branch: 'main',
      path: '/',
    },
  };
  let createPagesResponse;
  try {
    createPagesResponse = await axios({
      url:
        `https://api.github.com/repos/${
          ghUsername
        }/${
          repoName
        }/pages`,
      method: 'post',
      headers: {
        Authorization: `token ${ghToken}`,
        Accept: 'application/vnd.github.switcheroo-preview+json',
      },
      data: pagesBody,
    });
    if (createPagesResponse.status === 201) {
      logger.info('Pages site successfully created');
    } else {
      // see https://docs.github.com/en/rest/reference/repos#create-a-github-pages-site
      logger.debug(createPagesResponse.data);
    }
  } catch (err) {
    logger.error(err);
  }
}

async function buildPages(ghUsername, ghToken, repoName) {
  const options = {
    Authorization: `token ${ghToken}`,
    Accept: 'application/vnd.github.v3+json',
  };
  try {
    await axios({
      url:
        `https://api.github.com/repos/${
          ghUsername
        }/${
          repoName
        }/pages/builds`,
      method: 'post',
      headers: options,
    });
    logger.info('Build queued');
  } catch (err) {
    logger.error(err);
  }
}

module.exports = pushBuiltAppToPages;
