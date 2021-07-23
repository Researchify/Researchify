/**
 * This module defines the endpoints for the "/theme" route and exports the corresponding Router.
 */

const themeRouter = require('express').Router();

const themeController = require('../controllers/theme');

themeRouter.post('/', themeController.findOrCreateTheme);

module.exports = themeRouter;
