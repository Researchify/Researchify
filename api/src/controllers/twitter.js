/**
 * This module contains handlers for the "twitter" route.
 */
const axios = require("axios");

const mongoose = require("mongoose");

const Team = require("../models/team.model");


const options = {
    headers: {'Authorization': "Bearer " + process.env.TWITTER_BEARER_TOKEN}
};

async function storeHandle(req, res) {
    const {team_id: team_id} = req.params; // twitter handle
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
    await axios.get("https://api.twitter.com/2/users/by/username/" + handle, options)
        .then((response) => {
            // successful in finding the user
            console.log(response.data);
            // store the handle 
            foundTeam.set("twitterHandle", handle);
        }).catch(error => {
            // not stopping after returning error
            return res.status(404).json(`Error: ${error}`);
        });

    try {
        const updatedTeam = await Team.findByIdAndUpdate(team_id, foundTeam, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedTeam);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
    
}

module.exports = {storeHandle};