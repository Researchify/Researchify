/**
 * This module defines endpoints for the "/publications" route and exports its corresponding Router.
 */
const authRouter = require('express').Router();

const authController = require('../controllers/auth');

authRouter.post('/login', authController.login);

authRouter.post('/logout', authController.logout);

module.exports = authRouter;
