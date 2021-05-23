/**
 * This module contains handlers for the "team" route.
 */
const axios = require("axios");
const mongoose = require("mongoose");
const Team = require("../models/team.model");

const options = {
  headers: { Authorization: "Bearer " + process.env.TWITTER_BEARER_TOKEN },
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
async function storeHandle(req, res) {
  const { twitterHandle: handle } = req.body;
  let foundTeam = req.foundTeam;

  if (handle.length == 0) {
    // remove the handle from the doc
    foundTeam.twitterHandle = "";
  } else {
    // update the handle
    // validate the handle by getting user id
    if (!process.env.TWITTER_BEARER_TOKEN) {
      return res
        .status(500)
        .send("Error: No Twitter API Bearer Token found in .env file");
    }
    let response = await axios.get(
      "https://api.twitter.com/2/users/by/username/" + handle,
      options
    );
    if (response.data.errors) {
      return res.status(400).send("Error: " + response.data.errors[0].detail);
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
  return res.status(200).send(req.foundTeam);
}

/**
 * Handles a PATCH request to update a team's details on the endpoint /team/:id.
 * @param {*} req request object - team id in url, json object containing at least one field from team model.
 * @param {*} res response object - updated team object
 * @returns 200: returns updated team details
 * @returns 404: team not found
 * @returns 400: error updating team
 */
async function updateTeam(req, res) {
  const { id: _id } = req.params;
  const updates = req.body;
  const options = { new: true };

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Error: No team with that id.");

  try {
    const result = await Team.findByIdAndUpdate(_id, updates, options);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`Error: ${err.message}`);
  }
}

/**
 * Handles a POST request to add a team on the endpoint /team.
 * @param {*} req request object -  json object containing at least one field from team name and org name.
 * @param {*} res response object - updated team object
 * @returns 201: returns updated team details
 */
async function addTeam(req, res) {
    const team = req.body;

    const createdTeam = await Team.create(team);
    res.status(201).json(createdTeam);

}

module.exports = { storeHandle, getTeam, updateTeam, addTeam };
