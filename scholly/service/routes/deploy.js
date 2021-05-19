/**
 * This module defines endpoints for the "/deploy" route and exports its corresponding Router.
 */
const deployRouter = require('express').Router();

const deployController = require('../controllers/deploy');


deployRouter.post('/:teamId', deployController.handleDeployEvent);


module.exports = deployRouter;