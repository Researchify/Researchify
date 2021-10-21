/**
 * This module contains middleware functions for the team route (/routes/teams.js).
 */
const { Octokit } = require('@octokit/rest');
const { body, validationResult } = require('express-validator');

const Team = require('../models/team.model');
const { fillErrorObject } = require('./error');

/**
 * Middleware that validates a team id supplied in the request's parameters.
 * Once validated, the team is attached to the request object for use by
 * the next middleware.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 */
async function validateTeamId(req, res, next) {
  const { teamId } = req.params;
  const foundTeam = await Team.findById(teamId);

  if (!foundTeam) {
    return next(
      fillErrorObject(404,
        'Validation error. No team found with the given id.'),
    );
  }

  // Since we've already queried the Team, attach it to the request for reuse.
  req.foundTeam = foundTeam;
  return next();
}

/**
 * Middleware that validates a team's GitHub repository.
 * Once validated, the username is attached to the request object for use by
 * the next middleware.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 */
async function validateRepo(req, res, next) {
  const { ghToken } = req.body;
  const octokit = new Octokit({ auth: ghToken });
  try {
    // Get the authenticated user encapsulated by the token.
    const { data } = await octokit.rest.users.getAuthenticated();
    const owner = data.login;
    const repo = `${owner}.github.io`;
    // Check if the GitHub Pages repo exists.
    await octokit.rest.repos.get({ owner, repo });
    // Attach the owner and repo name to the request for reuse.
    req.repoOwner = owner;
    req.repoName = repo;
    return next();
  } catch (err) {
    if (err.status === 404) {
      return next(
        fillErrorObject(404, 'No Pages repo configured for this user.'),
      );
    }
    return next(fillErrorObject(500, 'Server Error', [err]));
  }
}

const validateTwitterHandle = [
  body(
    'twitterHandle',
    'Error: Twitter handle must be between 0 to 15 characters.', // 0 because it means remove the handle
  )
    .isLength({ min: 0, max: 15 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        fillErrorObject(400, 'Validation error', errors.errors.map((a) => a.msg)),
      );
    } else {
      next();
    }
  },
];

module.exports = {
  validateTeamId,
  validateTwitterHandle,
  validateRepo,
};
