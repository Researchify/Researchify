/**
 * This module defines the endpoints for the "/twitter" route and exports the corresponding Router.
 */

const teamRouter = require('express').Router();

const teamController = require('../controllers/team');

const teamMiddleware = require('../middleware/team');

teamRouter.patch(
  '/:team_id/twitter-handle',
  teamMiddleware.validateTeamId,
  teamMiddleware.validateTwitterHandle,
  teamController.storeHandle
);

teamRouter.get(
  '/:team_id',
  teamMiddleware.validateTeamId,
  teamController.getTeam
);

teamRouter.post(
  '/:team_id/member',
  teamMiddleware.validateTeamId,
  teamController.createTeamMember
);

teamRouter.get(
  '/:team_id/member',
  teamMiddleware.validateTeamId,
  teamController.readTeamMembersByTeam
);

teamRouter.delete(
  '/:team_id/member/:member_id',
  teamMiddleware.validateTeamId,
  teamController.deleteTeamMember
);

teamRouter.patch(
  '/:team_id/member',
  teamMiddleware.validateTeamId,
  teamController.updateTeamMember
);

teamRouter.post('/', teamController.addTeam);

module.exports = teamRouter;
