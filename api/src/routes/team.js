/**
 * This module defines the endpoints for the "/twitter" route and exports the corresponding Router.
 */
const teamRouter = require('express').Router();

const teamController = require('../controllers/team');
const teamMiddleware = require('../middleware/team');
const mongooseMiddleware = require('../middleware/mongoose');
const authMiddleware = require('../middleware/auth');

teamRouter.patch(
  '/:teamId/twitter-handle',
  authMiddleware.cookieJwtAuth,
  teamMiddleware.validateTeamId,
  teamMiddleware.validateTwitterHandle,
  teamController.storeHandle,
);

teamRouter.get(
  '/',
  authMiddleware.cookieJwtAuth,
  teamController.getTeam,
);

teamRouter.post(
  '/:teamId/member',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.createTeamMember,
);

teamRouter.get(
  '/:teamId/member',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.readTeamMembersByTeam,
);

teamRouter.delete(
  '/:teamId/member/:memberId',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.deleteTeamMember,
);

teamRouter.patch(
  '/:teamId/member',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.updateTeamMember,
);

teamRouter.get(
  '/:teamId/gh_auth/:code',
  teamController.getGHAccessToken,
);

teamRouter.post(
  '/:teamId/deploy',
  teamController.deployToGHPages,
);

teamRouter.post('/', teamController.createTeam);

teamRouter.patch(
  '/:teamId',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.updateTeam,
);

teamRouter.patch(
  '/:team_id/password',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.updatePassword,
);

module.exports = teamRouter;
