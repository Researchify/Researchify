/**
 * This module defines the endpoints for the "/website" route and exports the corresponding Router.
 */
const websiteRouter = require('express').Router();

const websiteController = require('../controllers/website');

websiteRouter.get('/:team_id', websiteController.getWebPageDetails);

websiteRouter.post('/:team_id/add_page', websiteController.addWebPage);

websiteRouter.post('/:team_id/delete_page', websiteController.deleteWebPage);

websiteRouter.post('/:team_id/updatePublicationOptions', websiteController.updatePublicationOptions);

websiteRouter.post('/:team_id/updateTitle', websiteController.updateTitle);

module.exports = websiteRouter;
