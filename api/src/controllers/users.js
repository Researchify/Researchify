/**
 * This module implements handlers for the "users" route.
 * @module users
 */
const mongoose = require("mongoose");

const User = require("../models/user.model");

/**
 * Handles a GET request to get all users on the database on the endpoint /users.
 *
 * @param req request object
 * @param res response object - a list of users (see User model)
 * @returns 200: JSON objects of all users
 * @returns 500: there was an internal error trying to get all the users
 */
async function getUsers(req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json("Error: " + err));
}

/**
 * Handles a GET request, which will get a particular user using the given mongo id on the endpoint /users/:id
 * 
 * @param req request object - user id given in url
 * @param res response object - user object in body (see User model)
* @returns 200: the specified user was found
 * @returns 400: given user id is not in a valid hexadecimal format
 * @returns 404: no user was found
 */
 async function getUser(req, res) {
  const {id: _id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).send('Error: The provided user id is not in a valid hexadecimal format.');
  
  const targetUser = await User.findById(_id);

  if (targetUser == null) { 
      res.status(404).send('Error: No user matching the id was found.');
  } else {
      res.status(200).json(targetUser);
  }
}

/**
 * Handles a POST request to add a new user to the database on the endpoint /users.
 *
 * @param req request object - user object in body (see User model)
 * @param res response object
 * @returns 201: user was added
 * @returns 400: error adding the user
 */
async function addUser(req, res) {
  const newUser = new User({
    givenName: req.body.givenName,
    familyName: req.body.familyName,
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => res.status(201).json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
}

/**
 * Handles a POST request to verify the login credentials of a user on the endpoint /users/login.
 *
 * @param req request object - user object in body (see User model)
 * @param res response object
 * @returns 200: successfully logged in
 * @returns 400: Error trying to login
 * @returns 403: incorrect password
 */
async function loginUser(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user == null) {
        res.status(400).send("User not found");
      } else if (user.password != req.body.password) {
        res.status(403).send("Incorrect password");
      } else {
        res.send("Successfully logged in");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
}

/**
 * Handles a PATCH request to update a user's details on the endpoint /users/:id.
 *
 * @param req request object - user id in url, user object in body (see User model)
 * @param res response object - created user object
 * @returns 200: returns updated user details
 * @returns 404: user not found
 * @returns 400: error updating user
 */
async function updateUser(req, res) {
  const { id: _id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Error: No user with that id.");

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, user, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(`Error: ${err.message}`);
  }
}

module.exports = { getUsers, getUser, addUser, loginUser, updateUser };
