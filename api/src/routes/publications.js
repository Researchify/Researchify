/**
 * This module defines endpoints for the "/publications" route and exports its corresponding Router.
 */
const publicationsRouter = require('express').Router();

const publicationsController = require('../controllers/publications');


publicationsRouter.delete('/:id', publicationsController.deletePublication);

publicationsRouter.patch('/:id', publicationsController.updatePublication);

publicationsRouter.post('/', publicationsController.createPublication);

publicationsRouter.get('/:id', publicationsController.readPublication);

publicationsRouter.get('/team/:team_id', publicationsController.readAllPublications);


module.exports = publicationsRouter;