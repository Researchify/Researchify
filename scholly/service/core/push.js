/**
 * This module exports a utility function used to deploy the built base up
 * to the team's GitHub Pages repo.
 */ /* eslint-disable no-console */
const ghpages = require('gh-pages');
const winston = require('winston');
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
  console.log(ghUsername);
  console.log(ghToken);
  await makeGHRepo(ghUsername, ghToken, repoName);
  await ghpages.publish(
    '../base/build',
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
        winston.error(
          `Failed to push built app to GitHub Pages for ${ghUsername}`,
          err,
        );
        throw err;
      } else {
        winston.info(`Successfully deployed app for ${ghUsername}`);
      }
      cleanupBuild(); // TODO this is not working for some reason
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
      winston.error('Failed to remove built directory.');
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
  let repoResponse;
  let error = null;
  try {
    repoResponse = await axios.get(
      `https://api.github.com/search/repositories?${searchQuery}`,
      {
        headers: options,
      },
    );
  } catch (err) {
    error = err;
  }

  if (err?.response.status !== 422) {
    // Error 422 is fine (it can be caused by user having no repo or only private ones in their account), any other should be thrown back up.
    winston.error(
      `Error checking existing repositories for user: ${ghUsername}`,
      err,
    );
    throw err;
  } else if (repoResponse.data.total_count !== 1) {
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
      console.log('Repo was created successfully');
    } catch (err) {
      console.log(err);
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
    console.log('GH Pages already configured for repo');
  } catch (err) {
    console.log(err);
    console.log('GH pages not created yet');
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
      console.log('Pages site successfully created');
    } else {
      // see https://docs.github.com/en/rest/reference/repos#create-a-github-pages-site
      console.log(createPagesResponse.data);
    }
  } catch (err) {
    console.log(err);
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
    console.log('Build queued');
  } catch (err) {
    console.log(err);
  }
}

module.exports = pushBuiltAppToPages;
