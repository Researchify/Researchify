/**
 * This module contains handlers for the "team" route.
 * @module team
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

/**
 * Gets the team member arrray from the database on /team/:team_id/member.
 * @param {*} req request object, containing team id in the url 
 * @param {*} res response object, the returned team memeber array
 * @returns 200: the team member array was returned
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function readTeamMembersByTeam(req, res){
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
    const teamMember = req.body;
    let foundTeam = req.foundTeam;
    await foundTeam.teamMembers.push(teamMember);
    foundTeam.save()
    res.status(201).json(teamMember);
}

/**
 * Delete the team memeber from the database on /team/:team_id/member/:member_id.
 * @param {*} req request object, containing team id in the url 
 * @param {*} res response object, the relevant messgae returned
 * @returns 200: the team memeber was deleted
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function deleteTeamMember(req, res){
    let foundTeam = req.foundTeam;
    const {teamMemberId} = req.params;
    await foundTeam.teamMembers.pull({_id: teamMemberId})
    foundTeam.save()
    return res.status(200).json({message: 'Team member deleted successfully.'})
}

/**
 * Update the team member from the database on /team/:team_id/member.
 * @param {*} req request object, containing team id in the url 
 * @param {*} res response object, the updated team memeber document
 * @returns 200: the team memember was updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function updateTeamMember(req, res){
    let foundTeam = req.foundTeam;
    const updatedTeamMember = req.body;

    console.log(updatedTeamMember)

    let result = foundTeam.teamMembers.findOneAndUpdate({_id: updatedTeamMember._id, updatedTeamMember})
    foundTeam.save()
    return res.status(200).json(result)
}


module.exports = { storeHandle, getTeam, createTeamMember, readTeamMembersByTeam, deleteTeamMember, updateTeamMember };