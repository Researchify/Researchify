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

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const options = {
  headers: { Authorization: 'Bearer ' + process.env.TWITTER_BEARER_TOKEN },
};

const { accessTokenExpiry, refreshTokenExpiry, accessTokenCookieExpiry, refreshTokenCookieExpiry } = require('../config/tokenExpiry');

/**
 * Associates a twitter handle with a team on the /team/twitter-handle/:team-id endpoint.
 * @param {*} req request object, containing the team_id in the url and twitter handle in the body
 * @param {*} res response object
 * @returns 200: successful added twitter handle to team
 * @returns 400: team id is not in a valid hexadecimal format
 * @returns 404: team is not found, or handle is invalid
 * @returns 500: error trying to update the document in db
 */
async function storeHandle(req, res) {
  const { twitterHandle: handle } = req.body;
  let foundTeam = req.foundTeam;

  if (handle.length == 0) {
    // remove the handle from the doc
    foundTeam.twitterHandle = '';
  } else {
    // update the handle
    // validate the handle by getting user id
    if (!process.env.TWITTER_BEARER_TOKEN) {
      return res
        .status(500)
        .send('Error: No Twitter API Bearer Token found in .env file');
    }
    let response = await axios.get(
      'https://api.twitter.com/2/users/by/username/' + handle,
      options
    );
    if (response.data.errors) {
      return res.status(400).send('Error: ' + response.data.errors[0].detail);
    } else {
      foundTeam.twitterHandle = handle;
    }
  }

  try {
    // update in db
    foundTeam.save();
    return res.status(200).json(foundTeam);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
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
    const foundTeam = await Team.findOne({ email: req.body.email })
    if (!foundTeam) {
      return res.status(400).send('Incorrect email/password'); // user not found 
    } 
    if (await bcrypt.compare(req.body.password, foundTeam.password)){
      const teamObj = foundTeam.toObject(); // converts a mongoose object to a plain object 
      // remove sensitive data 
      delete teamObj.password 
      const accessToken = jwt.sign(teamObj, process.env.JWT_SECRET_1 || "JWT_SECRET_1", {
        expiresIn: accessTokenExpiry
      });
      const refreshToken = jwt.sign(teamObj, process.env.JWT_SECRET_2 || "JWT_SECRET_2", {
        expiresIn: refreshTokenExpiry
      });
      res.cookie('accessToken', accessToken, { 
        httpOnly: true,
        maxAge: accessTokenCookieExpiry, // 5 mins
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: refreshTokenCookieExpiry, // 1 year
      })
      return res.status(200).send({
        teamId: teamObj._id, 
        email: teamObj.email,
        teamName: teamObj.teamName,
        orgName: teamObj.orgName
      });
    } 
    return res.status(403).send('Incorrect email/password'); // incorrect password 
  } catch (error){
    return res.status(422).json(`Error: ${error.message}`);
  }
}

/**
 * Handles a POST request to add a team on the endpoint /team.
 * @param {*} req request object -  json object containing at least two fields - teamName and orgName.
 * @param {*} res response object - updated team object
 * @returns 201: returns updated team details
 */
async function addTeam(req, res) {
  try{
    const foundTeam = await Team.findOne({ email: req.body.email })
    if (foundTeam) {
      return res.status(400).send('Email had been registered');
    } 
    const salt = await bcrypt.genSalt()
    const hashedPassword =  await bcrypt.hash(req.body.password, salt)
    const hashedTeam = {...req.body, password: hashedPassword}
    const createdTeam = await Team.create(hashedTeam);
    res.status(201).json(createdTeam._id);
  } catch(error){ 
    return res.status(422).json(`Error: ${error.message}`);
  }
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
async function createTeamMember(req, res) {
  let teamMember = req.body;
  const memberId = new mongoose.Types.ObjectId();
  let foundTeam = req.foundTeam;
  teamMember = { ...teamMember, _id: memberId };
  await foundTeam.teamMembers.push(teamMember);
  foundTeam.save();
  res.status(201).json(teamMember);
}

/**
 * Delete the team member from the database on /team/:team_id/member/:member_id.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the relevant message returned
 * @returns 200: the team member was deleted
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function deleteTeamMember(req, res) {
  let foundTeam = req.foundTeam;
  const { member_id } = req.params;
  await foundTeam.teamMembers.pull({ _id: member_id });
  foundTeam.save();
  return res.status(200).json({ message: 'Team member deleted successfully.' });
}

/**
 * Update the team member from the database on /team/:team_id/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the updated team member document
 * @returns 200: the team member was updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function updateTeamMember(req, res) {
  const updatedTeamMember = req.body;
  try {
    await Team.updateOne(
      { 'teamMembers._id': updatedTeamMember._id },
      {
        $set: {
          'teamMembers.$': updatedTeamMember,
        },
      }
    );
    return res.status(200).json(updatedTeamMember);
  } catch (error) {
    return res.status(422).json(`Error: ${error.message}`);
  }
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

async function deployToGHPages(req, res) {
  const ghToken = req.body.ghToken;
  const teamId = req.params.team_id;
  const publications = req.body.publications;
  const twitterHandle = req.body.twitterHandle;

  // call github API to get username
  const response = await axios.get('https://api.github.com/user', {
    headers: { Authorization: 'token ' + ghToken },
  });

  if (response.data.errors) {
    return res.status(400).send('Error: ' + response.data.errors[0].detail);
  }

  const ghUser = response.data.login;
  console.log(ghUser);

  const body = {
    ghUsername: ghUser,
    ghToken: ghToken,
    teamTwitterHandle: twitterHandle,
    teamPublications: publications,
  };

  try {
    const schollyResponse = await axios({
      url: schollyHost + '/deploy/' + teamId,
      method: 'post',
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.status(200).json(schollyResponse.data);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Update the team from the database on /team/:team_id
 * @param {} req request object, containing team id in the url
 * @param {*} res response object, the updated team document
 * @returns 200: team updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function updateTeam(req, res) {
  const { team_id: _id } = req.params;
  const team = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('Error: No team with that id.');
  }
  try {
    const updatedTeam = await Team.findByIdAndUpdate(_id, team, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedTeam);
  } catch (err) {
    res.status(422).json(`Error: ${err.message}`);
  }
}

/**
 * Update the a logout request on /team/logout
 * @param {*} req request object
 * @param {*} res response object
 * @returns 200: logout successfully
 * @returns 404: error occur 
 */
async function logoutTeam(req, res) {
  try{
    res.cookie('accessToken', "", { 
      httpOnly: true,
      maxAge: 0,
    });
    res.cookie('refreshToken', "", { 
      httpOnly: true,
      maxAge: 0,
    });
    res.status(200).json('Logout Successfully');
  } catch (error){
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
  getGHAccessToken,
  deployToGHPages,
  loginTeam,
  updateTeam,
  logoutTeam
};
