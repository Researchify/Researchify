/**
 * This module defines endpoints for the "/users" route and exports its corresponding Router
 */
const usersRouter = require('express').Router();
const usersController = require('../controllers/users');
const authFunctions = require('../middlewares/authFunctions');

usersRouter.get('/', usersController.getUsers);

usersRouter.get('/current', authFunctions.ensureAuthenticated, usersController.getCurrentUser);

usersRouter.get('/:id', usersController.getUser);

usersRouter.post('/', usersController.addUser);

usersRouter.post('/login', usersController.loginUser);

usersRouter.get('/logout', usersController.logoutUser);

usersRouter.patch('/:id', usersController.updateUser);

module.exports = usersRouter;