/**
 * This module defines the endpoints for the "/twitter" route and exports the corresponding Router.
 */

const teamRouter = require('express').Router();

const teamController = require('../controllers/team');

const teamMiddleware = require('../middleware/team');

const mongooseMiddleware = require('../middleware/mongoose');


teamRouter.patch(
  '/:team_id/twitter-handle',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamMiddleware.validateTwitterHandle,
  teamController.storeHandle
);

teamRouter.get(
  '/:team_id',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.getTeam
);

teamRouter.post(
  '/:team_id/member',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.createTeamMember
);

teamRouter.get(
  '/:team_id/member',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.readTeamMembersByTeam
);

teamRouter.delete(
  '/:team_id/member/:member_id',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.deleteTeamMember
);

teamRouter.patch(
  '/:team_id/member',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.updateTeamMember
);

teamRouter.post('/', teamController.addTeam);

teamRouter.post('/login', teamController.loginTeam);

teamRouter.patch(
  '/:team_id',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.updateTeam
);

teamRouter.post('/logout', teamController.logoutTeam);

module.exports = teamRouter;