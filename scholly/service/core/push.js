/**
 * This module exports a utility function used to deploy the built base up to the team's GitHub Pages repo.
 *
 * TODO: use logging
 * TODO: Researchify needs an email!
 */
const ghpages = require('gh-pages');
const winston = require('winston');

// TODO: remove
const TEST_TOKEN = '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';


function pushBuiltAppToPages(ghUsername, ghToken) {
    ghpages.publish('../base/build', {
        branch: 'main',
        repo: `https://${ghUsername}:${ghToken}@github.com/${ghUsername}/${ghUsername}.github.io.git`,
        message: 'Deployed with Researchify :)',
        user: {
            name: 'Researchify',
            email: 'researchify@bot.com'
        },
        history: false
    }, err => {
        if (err) {
            winston.error(err);
        } else {
            winston.info(`Successfully deployed app for ${ghUsername}`);
        }
    })
}


module.exports = pushBuiltAppToPages;
