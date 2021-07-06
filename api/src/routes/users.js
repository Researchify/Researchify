/**
 * This module defines endpoints for the "/users" route and exports its corresponding Router
 */
const usersRouter = require('express').Router();

const usersController = require('../controllers/users');

usersRouter.get('/', usersController.getUsers);

usersRouter.get('/:id', usersController.getUser);

usersRouter.post('/', usersController.addUser);

usersRouter.post('/login', usersController.loginUser);

usersRouter.patch('/:id', usersController.updateUser);

module.exports = usersRouter;
