/**
 * This module defines the endpoints for the "/website" route and exports the corresponding Router.
 */
const websiteRouter = require('express').Router();

const websiteController = require('../controllers/website');

websiteRouter.get('/:teamId', websiteController.getWebPageDetails);

websiteRouter.post('/:teamId/add_page', websiteController.addWebPage);

websiteRouter.post('/:teamId/delete_page', websiteController.deleteWebPage);

websiteRouter.patch('/:team_id', websiteController.pathClientWebMetadata);

module.exports = websiteRouter;
