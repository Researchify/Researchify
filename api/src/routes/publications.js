/**
 * This module defines endpoints for the "/publications" route and exports its corresponding Router.
 */
const publicationsRouter = require('express').Router();

const publicationsController = require('../controllers/publications');

const publicationsMiddleware = require('../middleware/publications');

const teamMiddleware = require('../middleware/team');

const mongooseMiddleware = require('../middleware/mongoose');

publicationsRouter.delete(
  '/:id',
  mongooseMiddleware.validatePublicationObjectId,
  publicationsController.deletePublication
);

publicationsRouter.patch(
  '/:id',
  mongooseMiddleware.validatePublicationObjectId,
  publicationsController.updatePublication
);

publicationsRouter.post(
  '/',
  publicationsMiddleware.createPublicationValidation,
  publicationsController.createPublication
);

publicationsRouter.get(
  '/:id',
  mongooseMiddleware.validatePublicationObjectId,
  publicationsController.readPublication
);

publicationsRouter.get(
  '/import/:gScholarUserId/:startFrom/validate/:team_id',
  mongooseMiddleware.validateTeamObjectId,
  publicationsMiddleware.validateAuthorId,
  publicationsController.getGoogleScholarPublications
);

publicationsRouter.get(
  '/team/:team_id',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  publicationsController.readAllPublicationsByTeam
);

publicationsRouter.post(
  '/import/:team_id',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  publicationsController.importPublications
);

module.exports = publicationsRouter;
