/**
 * This module defines the endpoints for the "/homepage" route and exports the corresponding Router.
 */
const homepageRouter = require('express').Router();

const homepageController = require('../controllers/homepage');

homepageRouter.post('/:team_id', homepageController.updateHomepage);

homepageRouter.get('/:team_id', homepageController.getHomepage);

module.exports = homepageRouter;
