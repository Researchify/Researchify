/**
 * @file This module contains handlers for the "deploy" route.
 * @module deploy
 */


/**
 * todo
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function handleDeployEvent(req, res) {
    const {team_id} = req.params;
    const {
        teamTwitterHandle: twitterHandle,
        teamPublications: foundPublication,
        ghUsername: username,
        ghToken: token
    } = req.body;
    
    res.status(200).send(twitterHandle);
}


module.exports = {handleDeployEvent};