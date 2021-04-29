/**
 * This module defines the endpoints for the "/twitter" route and exports the corresponding Router.
 */

const twitterRouter = require("express").Router();

const twitterController = require('../controllers/twitter');

twitterRouter.post('/storeHandle/:team_id', twitterController.storeHandle);

module.exports = twitterRouter;