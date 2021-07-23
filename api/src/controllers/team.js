/**
 * This module contains handlers for the "team" route.
 * @module team
 */
const axios = require('axios');

const Team = require('../models/team.model');

const mongoose = require('mongoose');

const { fillErrorObject } = require('../middleware/error');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const options = {
  headers: { Authorization: 'Bearer ' + process.env.TWITTER_BEARER_TOKEN },
};

const {
  accessTokenExpiry,
  refreshTokenExpiry,
  accessTokenCookieExpiry,
  refreshTokenCookieExpiry,
} = require('../config/tokenExpiry');

/**
 * Associates a twitter handle with a team on the /team/twitter-handle/:team-id endpoint.
 * @param {*} req request object, containing the team_id in the url and twitter handle in the body
 * @param {*} res response object
 * @returns 200: successful added twitter handle to team
 * @returns 400: team id is not in a valid hexadecimal format
 * @returns 404: team is not found, or handle is invalid
 * @returns 500: error trying to update the document in db
 */
async function storeHandle(req, res, next) {
  const { twitterHandle: handle } = req.body;
  let foundTeam = req.foundTeam;
  console.log("in here");

  if (handle.length == 0) {
    // remove the handle from the doc
    foundTeam.twitterHandle = '';
  } else {
    // update the handle
    // validate the handle by getting user id
    if (!process.env.TWITTER_BEARER_TOKEN) {
      next(
        fillErrorObject(500, 'Missing environment variable', [
          'No Twitter API Bearer Token found in .env file',
        ])
      );
    } else {
      let response = await axios.get(
        'https://api.twitter.com/2/users/by/username/' + handle,
        options
      );
      if (response.data.errors) {
        next(
          fillErrorObject(400, 'Validation error', [
            response.data.errors[0].detail,
          ])
        );
      } else {
        foundTeam.twitterHandle = handle;
      }
      foundTeam
        .save()
        .then(() => res.status(200).json(foundTeam))
        .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
    }
  }
}

/**
 * Gets the team document from the database on /team/:team_id.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the found team document
 * @returns 200: the team was found
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function getTeam(req, res) {
  console.log(req.foundTeam);
  return res.status(200).send(req.foundTeam);
}

/**
 * Handle login request from /team/login
 * @param {*} req request object, containing team email and password in the body as JSON
 * @param {*} res response object, the found teamId
 * @returns 200: the team was found
 * @returns 404: team is not found
 */
async function loginTeam(req, res) {
  try {
    const foundTeam = await Team.findOne({ email: req.body.email });
    if (!foundTeam) {
      return res.status(400).send('Incorrect email/password'); // user not found
    }
    if (await bcrypt.compare(req.body.password, foundTeam.password)) {
      const teamObj = foundTeam.toObject(); // converts a mongoose object to a plain object
      // remove sensitive data
      delete teamObj.password;
      const accessToken = jwt.sign(
        teamObj,
        process.env.JWT_SECRET_1 || 'JWT_SECRET_1',
        {
          expiresIn: accessTokenExpiry,
        }
      );
      const refreshToken = jwt.sign(
        teamObj,
        process.env.JWT_SECRET_2 || 'JWT_SECRET_2',
        {
          expiresIn: refreshTokenExpiry,
        }
      );
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: accessTokenCookieExpiry, // 5 mins
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: refreshTokenCookieExpiry, // 1 year
      });
      return res.status(200).send({
        teamId: teamObj._id,
        email: teamObj.email,
        teamName: teamObj.teamName,
        orgName: teamObj.orgName,
      });
    }
    return res.status(403).send('Incorrect email/password'); // incorrect password
  } catch (error) {
    return res.status(422).json(`Error: ${error.message}`);
  }
}

/**
 * Handles a POST request to add a team on the endpoint /team.
 * @param {*} req request object -  json object containing at least two fields - teamName and orgName.
 * @param {*} res response object - updated team object
 * @returns 201: returns updated team details
 */
async function addTeam(req, res, next) {
  Team.findOne({ email: req.body.email })
    .then((foundTeam) => {
      if (foundTeam) {
        return res.status(400).send('Email had been registered');
      }
    })
    .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const hashedTeam = { ...req.body, password: hashedPassword };
  Team.create(hashedTeam)
    .then((createdTeam) => res.status(201).json(createdTeam._id))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
}

/**
 * Gets the team member array from the database on /team/:team_id/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the returned team member array
 * @returns 200: the team member array was returned
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function readTeamMembersByTeam(req, res) {
  let foundTeam = req.foundTeam;
  return res.status(200).send(foundTeam.teamMembers);
}

/**
 * POST request to create a new team member to the database on /team/:team_id/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the created team member document
 * @returns 200: the team member was created
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
function createTeamMember(req, res, next) {
  let teamMember = req.body;
  const memberId = new mongoose.Types.ObjectId();
  let foundTeam = req.foundTeam;
  teamMember = { ...teamMember, _id: memberId };

  foundTeam.teamMembers.push(teamMember);
  foundTeam
    .save()
    .then(() => res.status(200).json(foundTeam.teamMembers))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err])));
}

/**
 * Delete the team member from the database on /team/:team_id/member/:member_id.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the relevant message returned
 * @returns 200: the team member was deleted
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
function deleteTeamMember(req, res, next) {
  let foundTeam = req.foundTeam;
  const { member_id } = req.params;
  foundTeam.teamMembers.pull({ _id: member_id });
  foundTeam
    .save()
    .then(() => res.status(200).json(foundTeam.teamMembers))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err])));
}

/**
 * Update the team member from the database on /team/:team_id/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the updated team member document
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
    }
  )
    .then(() => res.status(200).json(updatedTeamMember))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err])));
}

/**
 * Update the team from the database on /team/:team_id
 * @param {} req request object, containing team id in the url
 * @param {*} res response object, the updated team document
 * @returns 200: team updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
function updateTeam(req, res, next) {
  const { team_id: _id } = req.params;
  const team = req.body;

  Team.findByIdAndUpdate(_id, team, {
    new: true,
    runValidators: true,
  })
    .then((updatedTeam) => res.status(200).json(updatedTeam))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err])));
}

/**
 * Update the a logout request on /team/logout
 * @param {*} req request object
 * @param {*} res response object
 * @returns 200: logout successfully
 * @returns 404: error occur
 */
async function logoutTeam(req, res) {
  try {
    res.cookie('accessToken', '', {
      httpOnly: true,
      maxAge: 0,
    });
    res.cookie('refreshToken', '', {
      httpOnly: true,
      maxAge: 0,
    });
    res.status(200).json('Logout Successfully');
  } catch (error) {
    return res.status(422).json(`Error: ${error.message}`);
  }
}

module.exports = {
  storeHandle,
  getTeam,
  addTeam,
  createTeamMember,
  readTeamMembersByTeam,
  deleteTeamMember,
  updateTeamMember,
  loginTeam,
  updateTeam,
  logoutTeam,
};
