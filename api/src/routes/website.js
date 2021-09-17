/**
 * This module defines the endpoints for the "/website" route and exports the corresponding Router.
 */
const websiteRouter = require('express').Router();

const websiteController = require('../controllers/website');

websiteRouter.get('/:teamId', websiteController.getWebPageDetails);

websiteRouter.post('/:teamId/add_page', websiteController.addWebPage);

websiteRouter.post('/:teamId/delete_page', websiteController.deleteWebPage);

websiteRouter.delete('/:team_id/reset_page', websiteController.resetWebPage);

websiteRouter.post('/:team_id/updatePublicationOptions', websiteController.updatePublicationOptions);

websiteRouter.post('/:team_id/updateTitle', websiteController.updateTitle);

module.exports = websiteRouter;
