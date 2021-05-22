/**
 * This module exports a utility function used to deploy the built base up to the team's GitHub Pages repo.
 *
 * TODO: Researchify needs an email!
 */
const ghpages = require('gh-pages');
const winston = require('winston');
const fs = require('fs');
const path = require('path');

const PATH_TO_BASE_REACT_APP = path.join(__dirname, '..', '..', '/base');


/**
 * This function takes in a user's GitHub username and their PAT and deploys the built React base app to
 * their GitHub pages repository.
 *
 * @param ghUsername the GitHub username of the account the app needs to be deployed to.
 * @param ghToken the Personal Access Token (PAT) of the user's account with push permissions.
 * @throws Error if the push failed.
 */
async function pushBuiltAppToPages(ghUsername, ghToken) {
    await ghpages.publish('../base/build', {
        branch: 'main',
        repo: `https://${ghUsername}:${ghToken}@github.com/${ghUsername}/${ghUsername}.github.io.git`,
        message: 'Deployed with Researchify :)',
        user: {
            name: 'Researchify',
            email: 'researchify@bot.com'
        }
    }, err => {
        if (err) {
            winston.error(`Failed to push built app to GitHub Pages for ${ghUsername}`, err);
            throw err;
        } else {
            winston.info(`Successfully deployed app for ${ghUsername}`);
        }
        cleanupBuild();  // TODO this is not working for some reason
    });
}

/**
 * Utility function to remove the generated build directory after the React base app has been built.
 * We won't be requiring it anymore and can thus be removed.
 */
function cleanupBuild() {
    fs.rm(`${PATH_TO_BASE_REACT_APP}/build`, {recursive: true}, err => {
        if (err) {
            winston.error('Failed to remove built directory.');
        }
    });
}


module.exports = pushBuiltAppToPages;
