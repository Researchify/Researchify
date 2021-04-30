/**
 * This module defines the endpoints for the "/twitter" route and exports the corresponding Router.
 */

const teamRouter = require("express").Router();

const teamController = require('../controllers/team');

teamRouter.patch('/twitter-handle/:team_id', teamController.storeHandle);

teamRouter.get('/:team_id', teamController.getTeam);

module.exports = teamRouter;