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
    const {teamPublications: data} = req.body;
    console.log(team_id);
    console.log(data);
    res.status(200).send(data);
}


module.exports = {handleDeployEvent};