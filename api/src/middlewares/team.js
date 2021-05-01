/**
 * This module contains middleware functions for the team route (/routes/teams.js).
 */

const mongoose = require("mongoose");

const Team = require("../models/team.model");

async function validateTeamId(req, res, next) {
    const {team_id} = req.params;
    let foundTeam;

    if (mongoose.Types.ObjectId.isValid(team_id)) {
        foundTeam = await Team.findById(team_id);
        if (foundTeam == null) {
            return res.status(404).send(`Error: No team found with given id.`);
        }
    } else {
        return res.status(400).send("Error: Given team id is not in a valid hexadecimal format.");
    }

    next()
}

module.exports = { validateTeamId }