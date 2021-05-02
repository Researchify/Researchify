/**
 * This module contains handlers for the "team" route.
 */
const axios = require("axios");


const options = {
    headers: {'Authorization': "Bearer " + process.env.TWITTER_BEARER_TOKEN}
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
    const {twitterHandle: handle} = req.body;
    let foundTeam = req.foundTeam;

    if (handle.length == 0) {  // remove the handle from the doc
        foundTeam.twitterHandle = ""
    } else {  // update the handle
        // validate the handle by getting user id
        if (!process.env.TWITTER_BEARER_TOKEN) {
            return res.status(500).send("Error: No Twitter API Bearer Token found in .env file");
        }
        let response = await axios.get("https://api.twitter.com/2/users/by/username/" + handle, options)
        if (response.data.errors) {
            return res.status(400).send("Error: " + response.data.errors[0].detail);
        } else {
            foundTeam.twitterHandle = handle;
        }
    }

    try {  // update in db
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

module.exports = { storeHandle, getTeam };