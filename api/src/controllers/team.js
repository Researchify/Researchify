/**
 * This module contains handlers for the "team" route.
 * @module team
 */
const axios = require('axios');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const logger = require('winston');
const path = require('path');
const { Octokit } = require('@octokit/rest');

const Team = require('../models/team.model');
const Achievement = require('../models/achievement.model');
const Publication = require('../models/publication.model');
const Website = require('../models/website.model');
const Homepage = require('../models/homepage.model');

const transporter = require('../config/mail');
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
 * @returns 201 with team details
 * @returns 500 if a server error occurred
 */
async function createTeam(req, res, next) {
  const { email, password } = req.body;
  try {
    if (await Team.findOne({ email })) {
      return next(
        fillErrorObject(400, 'Duplicate email error', [
          'Email had been registered',
        ]),
      );
    }
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const hashedTeam = {
      ...req.body,
      password: hashedPassword,
    };
    const createdTeam = await Team.create(hashedTeam);

    // Notify registration via email; don't await completion.
    transporter.sendMail({
      to: email,
      subject: 'Welcome to Researchify',
      template: 'signup',
      context: {
        name: email,
      },
      attachments: [
        {
          filename: 'presentation.png',
          path: path.join(__dirname.split('/').slice(0, -1).join('/'), '/config/mail/views/images/presentation.png', '/').slice(0, -1),
          cid: 'cid-presentation',
        },
      ],
    }, (err) => {
      if (err) {
        logger.error(`Email failed to send to ${email}: ${err.message}`);
      }
    });

    // Strip sensitive data before responding.
    delete createdTeam.password;
    return res.status(201).json(createdTeam);
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err]));
  }
}

/**
 * Gets a team's info on /team/.
 *
 * TODO: overhaul auth - the client uses this for session resumption.
 *
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
      return next(fillErrorObject(404, 'Team not found'));
    })
    .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
}

/**
 * Updates a team's password on /team/:teamId/password-reset
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 * @returns 200 with the updated team, if the reset was successful
 * @returns 404 if the team was not found
 * @returns 400 if the team id is not in a valid hexadecimal format or the
 *     current password is incorrect
 * @returns 500 if a server error occurred
 */
async function updatePassword(req, res, next) {
  const { foundTeam } = req;
  const { currentPassword, newPassword } = req.body;

  try {
    if (!await bcrypt.compare(currentPassword, foundTeam.password)) {
      return next(
        fillErrorObject(400, 'Authentication failed. Incorrect password.'),
      );
    }
    foundTeam.password = await bcrypt.hash(newPassword, await bcrypt.genSalt());
    await foundTeam.save();
    // Remove sensitive data before returning the response.
    delete foundTeam.password;
    return res.status(200).json(foundTeam);
  } catch (err) {
    return next(
      fillErrorObject(500, 'Server error', [err]),
    );
  }
}

/**
 * Update the team from the database on /team/:teamId
 *
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
 * Clears a team's data on /team/:teamId/data-reset.
 * This is useful for a team who wishes to start over with Researchify, but does
 * not want to delete their account.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 * @returns 204 no content, if all required data was successfully reset
 * @returns 404 if team is not found
 * @returns 400 if team id is not in a valid hexadecimal format
 * @returns 500 if a server error occurred
 */
async function resetTeamData(req, res, next) {
  const { teamId } = req.params;
  const { foundTeam } = req;
  try {
    // Clear team members and twitter handle.
    foundTeam.teamMembers = [];
    foundTeam.twitterHandle = '';
    foundTeam.save();
    // Delete publications and achievements.
    await Publication.deleteMany({ teamId });
    await Achievement.deleteMany({ teamId });
    // Reset website pages and homepage about us section to initial values.
    await Website.findOneAndUpdate({ teamId }, { pages: [] });
    await Homepage.findOneAndUpdate({ teamId }, { aboutUs: '' });

    return res.status(204).send();
  } catch (err) {
    return next(
      fillErrorObject(500, 'Server error', [err]),
    );
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
 * POST request to create a new team member on /team/:teamId/members.
 *
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
 * Gets the list of team members on /team/:teamId/members.
 *
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
 * Update a team member on /team/:teamId/members/:memberId.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 * @returns 200: the team member was updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
function updateTeamMember(req, res, next) {
  const { memberId } = req.params;
  const updatedTeamMember = req.body;
  Team.updateOne(
    { 'teamMembers._id': memberId },
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
 * Deletes a team member on /team/:teamId/members/:memberId.
 *
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
 * Handles a PATCH request to delete a list of team members by the mongo object
 * id on the endpoint /team/:teamId/members.
 *
 * @param req request object - the list of team member ids given in the body
 * @param res response object
 * @returns 200: team members deleted successfully
 * @returns 400: error deleting team members
 */
async function deleteBatchTeamMembers(req, res, next) {
  try {
    const { teamId } = req.params;
    const teamMemberIdList = req.body;
    await Team.findOneAndUpdate(
      { _id: teamId },
      { $pull: { teamMembers: { _id: { $in: teamMemberIdList } } } },
      { new: true },
    );
    return res.status(200).json(teamMemberIdList);
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Associates a twitter handle with a team on the /team/twitter-handle/:teamId endpoint.
 *
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
 * Handles a POST request on /:teamId/pages-deploy to deploy a client's website
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
 * Deletes a team's GitHub Pages repository on /:teamId/pages-clear.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 * @returns 204 no content, if the delete was successful
 * @returns 404 team or the Pages repo is not found
 * @returns 400 team id is not in a valid hexadecimal format
 * @returns 500 if a server error occurred
 */
async function deleteGHPages(req, res, next) {
  const { ghToken } = req.body;
  const { repoOwner: owner, repoName: repo } = req;

  logger.info(`GitHub Pages delete initiated for ${owner}.`);
  const octokit = new Octokit({ auth: ghToken });
  try {
    await octokit.rest.repos.delete({ owner, repo });
    logger.info(`GitHub Pages deleted for ${owner}.`);
    return res.status(204).send();
  } catch (err) {
    return next(
      fillErrorObject(500, 'Server Error', [err]),
    );
  }
}

module.exports = {
  createTeam,
  getTeam,
  updatePassword,
  updateTeam,
  resetTeamData,
  deleteTeam,
  createTeamMember,
  readTeamMembersByTeam,
  updateTeamMember,
  deleteTeamMember,
  deleteBatchTeamMembers,
  storeHandle,
  getGHAccessToken,
  deployToGHPages,
  deleteGHPages,
};
