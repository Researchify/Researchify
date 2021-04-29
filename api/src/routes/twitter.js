/**
 * This module defines the endpoints for the "/twitter" route and exports the corresponding Router.
 */

const twitterRouter = require("express").Router();

const twitterController = require('../controllers/twitter');

twitterRouter.get('/tweets/:id', twitterController.getTweetsByHandle);

module.exports = twitterRouter;