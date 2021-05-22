/**
 * @file This module contains handlers for the "deploy" route.
 * @module deploy
 */

const axios = require("axios");
const mongoose = require("mongoose");
const winston = require("winston");

const Publication = require("../models/publication.model");


async function deploy(req, res) {
    const {team_id} = req.params;
    const {ghUsername: username, ghToken: token} = req.body;

    // fetch publications data for the team
    const foundPublication = await Publication.aggregate([
        {
            $match: {teamId: mongoose.Types.ObjectId(team_id)}
        },
        {
            $addFields: {year: {$year: "$yearPublished"}}
        },
        {
            $sort: {year: -1, title: 1}
        }
    ]);

    // fetch twitter handle
    const twitterHandle = req.foundTeam.twitterHandle;
    const data = {
        teamTwitterHandle: twitterHandle,
        teamPublications: foundPublication,
        ghUsername: username,
        ghToken: token
    }

    try {
        await axios.post("http://localhost:8000/deploy/" + team_id, data);
        res.status(200).send('Successfully deployed client website.');
        winston.debug(`Deployed client website for team ${team_id}`);
    } catch (err) {
        res.status(500).send('Could not deploy client website.');
        winston.error(err);
    }
}

module.exports = {deploy}