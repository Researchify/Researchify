/**
 * This module contains handlers for the "team" route.
 * @module team
 */
const axios = require('axios');

const Team = require('../models/team.model');

const mongoose = require('mongoose');

const { fillErrorObject } = require('../middleware/error');

const bcrypt = require('bcrypt');

const options = {
  headers: { Authorization: 'Bearer ' + process.env.TWITTER_BEARER_TOKEN },
};

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
 * Gets the team document from the auth middleware
 * @param {*} req request object, containing the team object 
 * @param {*} res response object, the team object 
 * @returns 200: return the team passed by the auth middleware 
 */
function getTeam(req, res) {
  return res.status(200).send(req.team);
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
function readTeamMembersByTeam(req, res) {
  const foundTeam = req.foundTeam;
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
    .then(() => res.status(200).json(teamMember))
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

module.exports = {
  storeHandle,
  getTeam,
  addTeam,
  createTeamMember,
  readTeamMembersByTeam,
  deleteTeamMember,
  updateTeamMember,
  updateTeam
};
