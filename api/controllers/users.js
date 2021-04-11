/**
 * This module implements handlers for the "users" route.
 */
const mongoose = require("mongoose");

const User = require("../models/user.model");

/**
 * Handles a GET request to get all users on the database on the endpoint /users.
 *
 * @param req request object
 * @param res response object
 * @returns: JSON objects of users
 */
async function getUsers(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
};

/**
 * Handles a POST request to get add a new user to the database on the endpoint /users.
 *
 * @param req request object
 * @param res response object
 * @sends: User added or error message
 */
async function addUser(req, res) {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
};

/**
 * Handles a POST request to verify the login credentials of a user on the endpoint /users/login.
 *
 * @param req request object
 * @param res response object
 * @sends: User not found, incorrect password, successfully logged in or error message. 
 */
async function loginUser(req, res) {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user == null) {
                res.status(400).send("User not found");
            } else if (user.password != req.body.password) {
                res.status(400).send("Incorrect password");
            } else {
                res.send("Successfully logged in");
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = {getUsers, addUser, loginUser};
