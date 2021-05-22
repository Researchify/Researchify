/**
 * This module defines endpoints for the "/deploy" route and exports its corresponding Router.
 */

const deployRouter = require("express").Router();
const deployController = require('../controllers/deploy');
const teamMiddleware = require('../middleware/team');


deployRouter.post('/:team_id', teamMiddleware.validateTeamId, deployController.deploy);

module.exports = deployRouter;