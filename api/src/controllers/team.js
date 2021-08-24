/**
 * This module contains handlers for the "team" route.
 * @module team
 */
const axios = require('axios');

const Team = require('../models/team.model');

const mongoose = require('mongoose');

const {
  githubAccessTokenUrlStart,
  githubAccessTokenUrlEnd,
  schollyHost,
} = require('../config/deploy');

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
        .catch((err) =>
          next(fillErrorObject(500, 'Server error', [err.errors]))
        );
    }
  }
}

/**
 * Gets the team info
 * @param {*} req request object contains the teamId decoded in auth middleware
 * @param {*} res response object, the team related info 
 * @returns 200: the team related info  
 */
function getTeam(req, res, next) {
  Team.findById(req.team._id).select('_id teamName orgName email twitterHandle')
  .then((foundTeam) => {
    if (foundTeam) {
      return res.status(200).send(foundTeam);
    }
  })
  .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
}

/**
 * Handles a POST request to add a team on the endpoint /team.
 * @param {*} req request object -  json object containing at least two fields - teamName and orgName.
 * @param {*} res response object - updated team object
 * @returns 201: returns updated team details
 */
async function createTeam(req, res, next) {
  const foundTeam = await Team.findOne({ email: req.body.email })
  if (foundTeam) {
    return next(fillErrorObject(400, 'Duplicate email error', ['Email had been registered']))
  }
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const hashedTeam = { ...req.body, password: hashedPassword };
  const createdTeam = await Team.create(hashedTeam)
  // remove sensitive data
  delete createTeam.password
  return res.status(201).json(createdTeam)
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

async function getGHAccessToken(req, res) {
  const code = req.params.code;
  console.log(req.params.code);

  const response = await axios({
    url: githubAccessTokenUrlStart + code + githubAccessTokenUrlEnd,
    method: 'post',
    headers: { Accept: 'application/json' },
  });
  console.log(response.data);

  if (response.data.error) {
    return res.status(400).json(response.data);
  }

  return res.status(200).json(response.data);
}

async function deployToGHPages(req, res, next) {
  const teamId = req.params.team_id;
  const { ghToken, teamPublications, teamInfo, teamMembers } = req.body;

  // call github API to get username
  const response = await axios.get('https://api.github.com/user', {
    headers: { Authorization: 'token ' + ghToken },
  });

  if (response.data.errors) {
    return next(
      fillErrorObject(400, 'Validation error', [response.data.errors[0].detail])
    );
  }

  const ghUsername = response.data.login;
  console.log(ghUsername);

  const body = {
    ghUsername,
    ghToken,
    teamPublications,
    teamInfo,
    teamMembers,
  };

  await axios
    .post(`${schollyHost}/deploy/${teamId}`, body)
    .then(() => res.status(200).json('Successfully deployed'))
    .catch(() =>
      next(
        fillErrorObject(500, 'Server error', ['Error occurred with scholly'])
      )
    );
}

/**
 * Update the team from the database on /team/:team_id
 * @param {} req request object, containing team id in the url
 * @param {*} res response object, the updated team document
 * @returns 200: team updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function updateTeam(req, res, next) { // eslint-disable-line no-unused-vars
  const { team_id: _id } = req.params;
  const team = req.body;
  if(team["password"]){
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(team["password"], salt);
    team.password = hashedPassword;
  }

  const updatedTeam = await Team.findByIdAndUpdate(_id, team, {
    new: true,
    runValidators: true,
  })

  res.status(200).json(updatedTeam)
}

module.exports = {
  storeHandle,
  getTeam,
  createTeam,
  createTeamMember,
  readTeamMembersByTeam,
  deleteTeamMember,
  updateTeamMember,
  updateTeam,
  getGHAccessToken,
  deployToGHPages,
};
