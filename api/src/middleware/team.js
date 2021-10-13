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

  if (foundTeam == null) {
    return next(
      fillErrorObject(404, 'Validation error', [
        'No team found with the given id',
      ]),
    );
  }

  req.foundTeam = foundTeam; // todo: does this need to be set inside middleware?
  return next();
}

/** *
 * Middleware that validates a team's gitHub Repository.
 * Once validated, the username is attached to the request object for use by
 * the next middleware.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 */
async function validateTeamRepo(req, res, next) {
  // Creating repoName
  const { ghToken } = req.body;
  try {
    const octokit = new Octokit({ auth: ghToken });
    const user = await octokit.rest.users.getAuthenticated();
    const ghUsername = user.data.login;
    const repoName = `${ghUsername}.github.io`;
    const validateGHpage = await octokit.rest.repos.get({
      owner: ghUsername,
      repo: repoName,
    });
    req.username = ghUsername;
    if (validateGHpage.status !== 200) {
      return next(
        fillErrorObject(404, 'GH pages not found!', [
          'GitHub Repo doesnt exist for this team!',
        ]),
      );
    }
    return next();
  } catch (error) {
    return next(
      fillErrorObject(500, 'Server Error!', [
        'Failed to access the repository!',
      ]),
    );
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
  validateTeamId, validateTeamRepo, validateTwitterHandle,
};
