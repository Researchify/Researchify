/**
 * @file This module contains handlers for the "deploy" route.
 * @module deploy
 */
const buildBaseApp = require('../core/build');
const pushBuiltAppToPages = require('../core/push');



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

    const data = {
        teamTwitterHandle: twitterHandle,
        teamPublications: foundPublication
    };

    await buildBaseApp(data);
    await pushBuiltAppToPages(username, token);

    res.status(200);
}


module.exports = {handleDeployEvent};