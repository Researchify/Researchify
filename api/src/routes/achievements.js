/**
 * This module defines endpoints for the "/achievements" route and exports its corresponding Router.
 */
const achievementsRouter = require('express').Router();

const achievementsController = require('../controllers/achievements');

const achievementsMiddleware = require('../middleware/achievements');
const authMiddleware = require('../middleware/auth');
const teamMiddleware = require('../middleware/team');
const mongooseMiddleware = require('../middleware/mongoose');

achievementsRouter.delete(
  '/:id',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateAchievementObjectId,
  achievementsController.deleteAchievement,
);

achievementsRouter.patch(
  '/:id',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateAchievementObjectId,
  achievementsController.updateAchievement,
);

achievementsRouter.post(
  '/',
  authMiddleware.cookieJwtAuth,
  achievementsMiddleware.createAchievementValidation,
  achievementsController.createAchievement,
);

achievementsRouter.get(
  '/team/:teamId',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  achievementsController.getAllAchievementsByTeam,
);

module.exports = achievementsRouter;
