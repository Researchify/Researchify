/**
 * This module defines endpoints for the "/foo" route and exports its corresponding Router
 */
const scholarRouter = require('express').Router();

const scholarController = require('../controllers/scholar');



scholarRouter.get('/:author', scholarController.getPublications);

module.exports = scholarRouter;