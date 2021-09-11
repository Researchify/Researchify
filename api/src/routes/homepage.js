/**
 * This module defines the endpoints for the "/homepage" route and exports the corresponding Router.
 */
const homepageRouter = require('express').Router();

const homepageController = require('../controllers/homepage');

homepageRouter.post('/:teamId', homepageController.updateHomepage);

homepageRouter.get('/:teamId', homepageController.getHomepage);

module.exports = homepageRouter;
