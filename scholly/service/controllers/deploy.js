/**
 * TODO: refactor promises to async-await inside build and push functions
 * @file This module contains handlers for the "deploy" route.
 * @module deploy
 */
const logger = require('winston');

const build = require('../core/build');
const push = require('../core/push');

/**
 * Handles a POST request to deploy a team's website on the endpoint /deploy/:teamId.
 *
 * @param req request object containing the :teamId as part of its params.
 * @param res response object to write the response into.
 * @returns 200: the team's site was both built and deployed successfully.
 * @returns 500: the team's site failed to build or deploy.
 */
async function handleDeployEvent(req, res) {
  const { teamId } = req.params;

  logger.info(`Attempting to build and deploy application for team ${teamId}`);
  const data = req.body;
  const repoName = `${data.ghUsername}.github.io`;

  try {
    await build(data);
    await push(data.ghUsername, data.ghToken, repoName);
    return res
      .status(200)
      .send('Successfully deployed application to GitHub Pages.');
  } catch (err) {
    logger.error(`Failed to deploy application for team ${teamId}.
    Error message: ${err.message}`);
    return res
      .status(500)
      .send(
        "Something went wrong. Researchify couldn't build/push your application.",
      );
  }
}

module.exports = { handleDeployEvent };
