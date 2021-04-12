/**
 * This module implements handlers for the "users" route.
 */
const mongoose = require("mongoose");
const { db } = require("../models/user.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

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
                res.status(400).json('User not found');
            } else if (user.password != req.body.password) {
                res.status(400).json("Incorrect password");
            } else {
                const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    "researchify_secret_abcd123",
                    { expiresIn: "1h" }
                  );
                  res.status(200).json({
                    token: token,
                    expiresIn: 3600,
                    userId: user._id
                  });
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

/**
 * Handles a PATCH request to update a user's details on the endpoint /users/:id.
 *
 * @param req request object
 * @param res response object
 * @sends: Updates the user object
 */
async function updateUser(req, res) {
    
    const {id: _id} = req.params;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('Error: No user with that id.');

    try {
        const updatedUser = await User.findByIdAndUpdate(_id, user, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(422).json(`Error: ${err.message}`);
    }
    
};

module.exports = {getUsers, addUser, loginUser, updateUser};
