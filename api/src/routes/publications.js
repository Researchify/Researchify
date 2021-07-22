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
  authMiddleware.authorizeUser,
  publicationsController.deletePublication
);

publicationsRouter.patch(
  '/:id', 
  authMiddleware.authorizeUser,
  publicationsController.updatePublication
);

publicationsRouter.post(
  '/',
  authMiddleware.authorizeUser,
  publicationsMiddleware.createPublicationValidation,
  publicationsController.createPublication
);

publicationsRouter.get('/:id', publicationsController.readPublication);

publicationsRouter.get(
  '/import/:gScholarUserId/:startFrom/validate/:teamId',
  authMiddleware.authorizeUser,
  publicationsMiddleware.validateAuthorId,
  publicationsController.getGoogleScholarPublications
);

publicationsRouter.get(
  '/team/:team_id',
  authMiddleware.authorizeUser,
  publicationsController.readAllPublicationsByTeam
);

publicationsRouter.post(
  '/import/:team_id',
  authMiddleware.authorizeUser,
  teamMiddleware.validateTeamId,
  publicationsController.importPublications
);

module.exports = publicationsRouter;
