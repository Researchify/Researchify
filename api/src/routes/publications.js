/**
 * This module defines endpoints for the "/publications" route and exports its corresponding Router.
 */
const publicationsRouter = require('express').Router();

const publicationsController = require('../controllers/publications');

const publicationsMiddleware = require('../middleware/publications');

const authMiddleware = require('../middleware/auth')

const teamMiddleware = require('../middleware/team');

publicationsRouter.delete(
  '/:id', 
  authMiddleware.cookieJwtAuth,
  publicationsController.deletePublication
);

publicationsRouter.patch(
  '/:id', 
  authMiddleware.cookieJwtAuth,
  publicationsController.updatePublication
);

publicationsRouter.post(
  '/',
  authMiddleware.cookieJwtAuth,
  publicationsMiddleware.createPublicationValidation,
  publicationsController.createPublication
);

publicationsRouter.get('/:id', publicationsController.readPublication);

publicationsRouter.get(
  '/import/:gScholarUserId/:startFrom/validate/:teamId',
  authMiddleware.cookieJwtAuth,
  publicationsMiddleware.validateAuthorId,
  publicationsController.getGoogleScholarPublications
);

publicationsRouter.get(
  '/team/:team_id',
  authMiddleware.cookieJwtAuth,
  publicationsController.readAllPublicationsByTeam
);

publicationsRouter.post(
  '/import/:team_id',
  authMiddleware.cookieJwtAuth,
  teamMiddleware.validateTeamId,
  publicationsController.importPublications
);

module.exports = publicationsRouter;
