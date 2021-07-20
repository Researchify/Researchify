/**
 * This module defines the endpoints for the "/twitter" route and exports the corresponding Router.
 */

const teamRouter = require('express').Router();

const teamController = require('../controllers/team');

const teamMiddleware = require('../middleware/team');

const mongooseMiddleware = require('../middleware/mongoose');


teamRouter.patch(
  '/:team_id/twitter-handle',
  mongooseMiddleware.validateObjectId,
  teamMiddleware.validateTeamId,
  teamMiddleware.validateTwitterHandle,
  teamController.storeHandle
);

teamRouter.get(
  '/:team_id',
  mongooseMiddleware.validateObjectId,
  teamMiddleware.validateTeamId,
  teamController.getTeam
);

teamRouter.post(
  '/:team_id/member',
  mongooseMiddleware.validateObjectId,
  teamMiddleware.validateTeamId,
  teamController.createTeamMember
);

teamRouter.get(
  '/:team_id/member',
  mongooseMiddleware.validateObjectId,
  teamMiddleware.validateTeamId,
  teamController.readTeamMembersByTeam
);

teamRouter.delete(
  '/:team_id/member/:member_id',
  mongooseMiddleware.validateObjectId,
  teamMiddleware.validateTeamId,
  teamController.deleteTeamMember
);

teamRouter.patch(
  '/:team_id/member',
  mongooseMiddleware.validateObjectId,
  teamMiddleware.validateTeamId,
  teamController.updateTeamMember
);

teamRouter.post('/', teamController.addTeam);

teamRouter.post('/login', teamController.loginTeam);

module.exports = teamRouter;
