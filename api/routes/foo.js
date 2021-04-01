/**
 * This module defines endpoints for the "/foo" route and exports its corresponding Router
 */
const fooRouter = require('express').Router();

const fooController = require('../controllers/foo');


fooRouter.get('/', fooController.getFoos);

fooRouter.get('/:id', fooController.getFoo);


module.exports = fooRouter;