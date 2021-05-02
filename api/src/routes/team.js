/**
 * This module defines the endpoints for the "/twitter" route and exports the corresponding Router.
 */

const teamRouter = require("express").Router();

const teamController = require('../controllers/team');

const teamMiddleware = require('../middlewares/team');

teamRouter.patch('/:team_id/twitter-handle', teamMiddleware.validateTeamId, teamMiddleware.validateTwitterHandle, teamController.storeHandle);

teamRouter.get('/:team_id', teamMiddleware.validateTeamId, teamController.getTeam);

module.exports = teamRouter;