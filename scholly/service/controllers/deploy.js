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
    const {teamId} = req.params;
    const {data} = req.body;

    console.log('TODO');
}


module.exports = {handleDeployEvent};