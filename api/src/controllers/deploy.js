/**
 * @file This module contains handlers for the "deploy" route.
 * @module deploy
 */

const axios = require("axios");
const mongoose = require("mongoose");

const Publication = require("../models/publication.model");


async function deploy(req, res) {
    const {team_id} = req.params;

    // fetch publications data for the team
    const foundPublication = await Publication.aggregate([
        {
            $match: { teamId: mongoose.Types.ObjectId(team_id) }
        },
        {
            $addFields: { year: { $year: "$yearPublished" } }
        },
        {
            $sort: { year: -1, title: 1 }
        }
    ]);

    // fetch twitter handle
    const twitterHandle = req.foundTeam.twitterHandle;
    const data = {
        teamTwitterHandle: twitterHandle,
        teamPublications: foundPublication
    }

    let response = await axios.post("http://localhost:8000/deploy/" + team_id, data);



    res.status(200).send(data);
    


}

module.exports = {deploy}