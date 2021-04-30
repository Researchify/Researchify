/**
 * This module contains handlers for the "twitter" route.
 */
const axios = require("axios");

const mongoose = require("mongoose");

const Team = require("../models/team.model");


const options = {
    headers: {'Authorization': "Bearer " + process.env.TWITTER_BEARER_TOKEN}
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function storeHandle(req, res) {
    const {team_id: team_id} = req.params;
    const {twitterHandle: handle} = req.body;

    // validate if the team exists
    if (mongoose.Types.ObjectId.isValid(team_id)) {
        var foundTeam = await Team.findById(team_id);
        console.log(foundTeam);
        if (foundTeam == null) {
            return res.status(404).send(`Error: No team found with given id.`);
        }
    } else {
        return res.status(404).send("Error: Given team id is not in a valid hexadecimal format.");
    }

    // validate the handle by getting user id
    var response = await axios.get("https://api.twitter.com/2/users/by/username/" + handle, options)
    if (response.data.errors) {
        return res.status(404).send("Error: " + response.data.errors[0].detail);
    } else {
        // console.log(response.data);
        foundTeam.set("twitterHandle", handle);
    }

    try {
        const updatedTeam = await Team.findByIdAndUpdate(team_id, foundTeam, {
            new: true,
            runValidators: true
        });
        return res.status(200).json(updatedTeam);
    } catch (err) {
        return res.status(500).send(`Error: ${err.message}`);
    }
    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function removeHandle(req, res) {
    const {team_id: team_id} = req.params;

    // validate if the team exists
    if (mongoose.Types.ObjectId.isValid(team_id)) {
        var foundTeam = await Team.findById(team_id);
        console.log(foundTeam);
        if (foundTeam == null) {
            return res.status(404).send(`Error: No team found with given id.`);
        }
    } else {
        return res.status(404).send("Error: Given team id is not in a valid hexadecimal format.");
    }

    foundTeam.twitterHandle = undefined;
    console.log(foundTeam);

    try {
        // not working yet
        const updatedTeam = await Team.findByIdAndUpdate(team_id, foundTeam, {
            new: true,
            runValidators: true
        });
        return res.status(200).json(updatedTeam);
    } catch (err) {
        return res.status(500).send(`Error: ${err.message}`);
    }

}

async function validateTeamId(team_id) {
    if (mongoose.Types.ObjectId.isValid(team_id)) {
        var foundTeam = await Team.findById(team_id);
        console.log(foundTeam);
        if (foundTeam == null) {
            return res.status(404).send(`Error: No team found with given id.`);
        }
    } else {
        return res.status(404).send("Error: Given team id is not in a valid hexadecimal format.");
    }

    return foundTeam;
}

module.exports = {storeHandle, removeHandle};