/**
 * This module contains handlers for the "team" route.
 * @module team
 */
const axios = require('axios');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const logger = require('winston');

const Team = require('../models/team.model');
const Achievement = require('../models/achievement.model');
const Publication = require('../models/publication.model');

const {
  githubClientId,
  githubClientSecret,
  schollyHost,
} = require('../config/deploy');
const { fillErrorObject } = require('../middleware/error');

/**
 * Handles a POST request to create a team on the endpoint /team.
 * A post-hook/middleware is associated with the {@link Team} model that will
 * create default-initialized dependent documents for the team being created.
 *
 * @param req request object containing at least two fields: teamName & orgName.
 * @param res response object - updated team object
 * @param next handler to the next middleware
 * @returns 201: returns updated team details
 */
async function createTeam(req, res, next) {
  const foundTeam = await Team.findOne({ email: req.body.email });
  if (foundTeam) {
    return next(
      fillErrorObject(400, 'Duplicate email error', [
        'Email had been registered',
      ]),
    );
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const hashedTeam = {
    ...req.body,
    password: hashedPassword,
  };
  const createdTeam = await Team.create(hashedTeam);
  // remove sensitive data
  delete createTeam.password;
  return res.status(201).json(createdTeam);
}

/**
 * Gets the team info
 * @param {*} req request object contains the teamId decoded in auth middleware
 * @param {*} res response object, the team related info
 * @param next handler to the next middleware
 * @returns 200: the team related info
 */
function getTeam(req, res, next) {
  Team.findById(req.team._id)
    .select('_id teamName orgName email twitterHandle profilePic')
    .then((foundTeam) => {
      if (foundTeam) {
        return res.status(200).send(foundTeam);
      }
      return next(fillErrorObject(404, 'Team not found',
        ['Team with the given id could not be found']));
    })
    .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
}

/**
 * Update the team from the database on /team/:teamId
 * @param req request object, containing team id in the url
 * @param res response object, the updated team document
 * @param next handler to the next middleware
 * @returns 200: team updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function updateTeam(req, res, next) {
  const { teamId: _id } = req.params;
  const team = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(_id, team, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updatedTeam);
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err]));
  }
}

/**
 * Handles a DELETE request to remove a team on the endpoint /team/:teamId.
 * A post-hook/middleware is associated with the {@link Team} model that will
 * delete all dependent documents for the team being deleted.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 * @returns 204 no content, if the delete was successful
 * @returns 500 if a server error occurred
 */
async function deleteTeam(req, res, next) {
  const { foundTeam } = req;
  try {
    await foundTeam.remove();
    return res.status(204).send();
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err]));
  }
}

/**
 * POST request to create a new team member to the database on /team/:teamId/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the created team member document
 * @param next handler to the next middleware
 * @returns 200: the team member was created
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
function createTeamMember(req, res, next) {
  let teamMember = req.body;
  const memberId = new mongoose.Types.ObjectId();
  const { foundTeam } = req;
  teamMember = {
    ...teamMember,
    _id: memberId,
  };

  foundTeam.teamMembers.push(teamMember);
  foundTeam
    .save()
    .then(() => res.status(200).json(teamMember))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err])));
}

/**
 * Gets the team member array from the database on /team/:teamId/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the returned team member array
 * @returns 200: the team member array was returned
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
function readTeamMembersByTeam(req, res) {
  const { foundTeam } = req;
  return res.status(200).send(foundTeam.teamMembers);
}

/**
 * Update the team member from the database on /team/:teamId/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the updated team member document
 * @param next handler to the next middleware
 * @returns 200: the team member was updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
function updateTeamMember(req, res, next) {
  const updatedTeamMember = req.body;
  Team.updateOne(
    { 'teamMembers._id': updatedTeamMember._id },
    {
      $set: {
        'teamMembers.$': updatedTeamMember,
      },
    },
  )
    .then(() => res.status(200).json(updatedTeamMember))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err])));
}

/**
 * Reset the team member from the database on /team/:teamId/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the updated team member document
 * @returns 200: the team member was updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function resetTeamMember(req, res, next) {
  const { teamId } = req.params;
  try {
    const team = await Team.findOne({ _id: teamId });
    team.teamMembers = [];
    team.save();
    return res.status(200).json(team);
  } catch (err) {
    return next(fillErrorObject(500, 'Serrrer error', [err]));
  }
}
/**
 * Delete the team member from the database on /team/:teamId/member/:member_id.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the relevant message returned
 * @param next handler to the next middleware
 * @returns 200: the team member was deleted
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
function deleteTeamMember(req, res, next) {
  const { foundTeam } = req;
  const { memberId } = req.params;
  foundTeam.teamMembers.pull({ _id: memberId });
  foundTeam
    .save()
    .then(() => res.status(200).json(foundTeam.teamMembers))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err])));
}

/**
 * Associates a twitter handle with a team on the /team/twitter-handle/:teamId endpoint.
 * @param {*} req request object, containing the teamId in the url and twitter handle in the body
 * @param {*} res response object
 * @param next handler to the next middleware
 * @returns 200: successful added twitter handle to team
 * @returns 400: team id is not in a valid hexadecimal format
 * @returns 404: team is not found, or handle is invalid
 * @returns 500: error trying to update the document in db
 */
async function storeHandle(req, res, next) {
  const { twitterHandle: handle } = req.body;
  const { foundTeam } = req;

  if (handle.length === 0) {
    // remove the handle from the doc
    foundTeam.twitterHandle = '';
  } else {
    // update the handle
    // validate the handle by getting user id
    if (!process.env.TWITTER_BEARER_TOKEN) {
      return next(
        fillErrorObject(500, 'Missing environment variable', [
          'No Twitter API Bearer Token found in .env file',
        ]),
      );
    }
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${handle}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      },
    );
    if (response.data.errors) {
      return next(
        fillErrorObject(400, 'Validation error', [
          response.data.errors[0].detail,
        ]),
      );
    }
    foundTeam.twitterHandle = handle;
  }

  try {
    foundTeam.save();
    return res.status(200).json(foundTeam);
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Handles a GET request on /:teamId/gh_auth/:code to exchange a GitHub
 * temporary code acquired during the first step of the GitHub OAuth flow with a
 * GitHub access token.
 *
 * @see:
 * https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
 *
 * @param req request object
 * @param res  response object
 * @param next handler to the next middleware
 * @returns 200 if the code was successfully exchanged for an access token
 * @returns 400 if the exchange was unsuccessful
 */
async function getGHAccessToken(req, res, next) {
  const { code } = req.params;

  const { data } = await axios.post(
    'https://github.com/login/oauth/access_token',
    null,
    {
      headers: {
        Accept: 'application/json',
      },
      params: {
        client_id: githubClientId,
        client_secret: githubClientSecret,
        code,
      },
    },
  );
  if (data.error) {
    return next(
      fillErrorObject(
        400,
        'Failed to exchange GitHub temporary code for GitHub Access Token.',
        [data],
      ),
    );
  }
  return res.status(200).json(data);
}

/**
 * Handles a POST request on /:teamId/deploy to deploy a client's website
 * by delegating to the Scholly service.
 *
 * @see:
 * https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
 *
 * @param req request object, containing in the body the GitHub token from the
 *     OAuth flow, and the necessary data needed by Scholly
 * @param res response object
 * @param next handler to the next middleware
 * @returns 200 if the deployment was successful
 * @returns 400 if the GitHub username could not be fetched using the token
 * @returns 500 if Scholly was unable to deploy the website
 */
async function deployToGHPages(req, res, next) {
  const { teamId } = req.params;
  // TODO (https://trello.com/c/DDVVvVCR) ideally this data should be fetched by
  //  us, and we should not expect the client to provide it.
  const {
    ghToken,
    teamPublications,
    teamInfo,
    teamMembers,
    teamHomepage,
    teamSiteMetadata,
    teamAchievements,
  } = req.body;

  // Call github API to get username.
  const { data } = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `token ${ghToken}` },
  });
  if (data.errors) {
    return next(
      fillErrorObject(400, 'Validation error', [data.errors[0].detail]),
    );
  }

  const ghUsername = data.login;
  logger.info(`GitHub deploy initiated for user: ${ghUsername}`);

  const body = {
    ghUsername,
    ghToken,
    teamPublications,
    teamInfo,
    teamMembers,
    teamHomepage,
    teamSiteMetadata,
    teamAchievements,
  };

  try {
    await axios.post(`${schollyHost}/deploy/${teamId}`, body);
    logger.info(`GitHub deploy succeeded for user: ${ghUsername}`);
    return res.status(200).json('Successfully deployed');
  } catch (err) {
    return next(
      fillErrorObject(500, 'Error occurred with scholly', [err.message]),
    );
  }
}

/**
 * Clear the team Data from the database on /team/:team_id
 * @param {} req request object, containing team id in the url
 * @param {*} res response object, the deleted team document
 * @returns 200: teamn is deleted
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function resetTeamData(req, res, next) {
  try {
    const { teamId } = req.params;
    const { isDeleteFlag } = req.body;
    await Achievement.deleteMany({ teamId });
    await Publication.deleteMany({ teamId });
    if (isDeleteFlag) {
      await Team.findByIdAndDelete(teamId);
      return res.status(200).json('Deleted successfully.');
    } return res.status(200).json('Cleared successfully.');
  } catch (error) {
    return next(
      fillErrorObject(500, 'Error occurred with server', [error.message]),
    );
  }
}

/**
 * Delete the team from the database on /team/:team_id
 * @param {} req request object, containing team id in the url
 * @param {*} res response object, the deleted team document
 * @returns 200: team is deleted
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function deleteGHPages(req, res, next) {
  const { ghToken } = req.body;
  const ghUsername = req.username;
  logger.info(`GitHub Pages delete initiated for user: ${ghUsername}`);
  const repoName = `${ghUsername}.github.io`;
  // delete repo
  try {
    const deleteRepo = await axios.delete(
      `https://api.github.com/repos/${ghUsername}/${repoName}`,
      {
        headers: {
          Authorization: `token ${ghToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );
    if (deleteRepo.status === 204) {
      logger.info(`GitHub pages deleted for user: ${ghUsername}`);
    }
    // result logged
    return res.status(200).json('Deleted successfully!');
  } catch (error) {
    logger.info(` Failed: GitHub pages not deleted for user: ${ghUsername}!`);
    return next(
      fillErrorObject(500, 'Error occurred with server!', ['Failed to delete GitHub pages']),
    );
  }
}

module.exports = {
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
  createTeamMember,
  readTeamMembersByTeam,
  updateTeamMember,
  resetTeamMember,
  resetTeamData,
  deleteTeamMember,
  storeHandle,
  getGHAccessToken,
  deployToGHPages,
  deleteGHPages,
};
