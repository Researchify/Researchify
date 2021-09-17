/**
 * This module defines the endpoints for the "/website" route and exports the corresponding Router.
 */
const websiteRouter = require('express').Router();

const websiteController = require('../controllers/website');

websiteRouter.get('/:teamId', websiteController.getWebPageDetails);

websiteRouter.post('/:teamId/add_page', websiteController.addWebPage);

websiteRouter.post('/:teamId/delete_page', websiteController.deleteWebPage);

websiteRouter.delete('/:teamId/reset_page', websiteController.resetWebPage);

websiteRouter.post('/:teamId/updatePublicationOptions', websiteController.updatePublicationOptions);

websiteRouter.post('/:teamId/updateTitle', websiteController.updateTitle);

module.exports = websiteRouter;
