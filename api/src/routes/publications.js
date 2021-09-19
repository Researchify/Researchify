/**
 * This module defines endpoints for the "/publications" route and exports its corresponding Router.
 */
const publicationsRouter = require('express').Router();

const publicationsController = require('../controllers/publications');
const publicationsMiddleware = require('../middleware/publications');
const authMiddleware = require('../middleware/auth');
const teamMiddleware = require('../middleware/team');
const mongooseMiddleware = require('../middleware/mongoose');

publicationsRouter.patch(
  '/',
  authMiddleware.cookieJwtAuth,
  publicationsController.deletePublications,
);

publicationsRouter.patch(
  '/:id',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validatePublicationObjectId,
  publicationsController.updatePublication,
);

publicationsRouter.post(
  '/',
  authMiddleware.cookieJwtAuth,
  publicationsMiddleware.createPublicationValidation,
  publicationsController.createPublication,
);

publicationsRouter.get(
  '/import/:gScholarUserId/:startFrom/validate/:teamId',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  publicationsMiddleware.validateAuthorId,
  publicationsController.getGoogleScholarPublications,
);

publicationsRouter.get(
  '/team/:teamId',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  publicationsController.readAllPublicationsByTeam,
);

publicationsRouter.post(
  '/import/:teamId',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  publicationsController.importPublications,
);

module.exports = publicationsRouter;
