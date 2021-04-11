/**
 * This module defines endpoints for the "/users" route and exports its corresponding Router
 */
const usersRouter = require('express').Router();

const usersController = require('../controllers/users');

usersRouter.get('/', usersController.getUsers);

usersRouter.post('/', usersController.addUser);

usersRouter.post('/login', usersController.loginUser);

module.exports = usersRouter;