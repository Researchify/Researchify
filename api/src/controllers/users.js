/**
 * This module implements handlers for the "users" route.
 */
const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const passport = require('passport');

/**
 * Handles a GET request to get all users on the database on the endpoint /users.
 *
 * @param req request object
 * @param res response object
 * @returns: JSON objects of users
 */
async function getUsers(req, res) {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(500).json("Error: " + err));
}

/**
 * Handles a GET request, which will get a particular user using the given mongo id on the endpoint /users/:id
 * 
 * @param req request object
 * @param res response object
 * @returns 400: given user id is not in a valid hexadecimal format
 * @returns 404: no user was found
 * @returns 200: the specified user was found
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
 * @param req request object
 * @param res response object
 * @sends: User added or error message
 */
async function addUser(req, res) {
	User.findOne({ email: req.body.email }, async (err, user) => {
		if (err) {
			res.status(500).json({message: err});
			return;
		}

		if (user) {
			res.status(400).json({message: "Email already registered"});
			return;
		}

		if (req.body.password != req.body.confirmPassword) {
			res.status(400).json({message: "Passwords do not match"});
			return;
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const newUser = new User({
			givenName: req.body.givenName,
			familyName: req.body.familyName,
			email: req.body.email,
			password: hashedPassword,
		});

		newUser
			.save()
			.then(() => res.status(201).json({message: "User added!"}))
			.catch((err) => res.status(400).json({message: "Error: " + err}));
  });
}

/**
 * Handles a POST request to verify the login credentials of a user on the endpoint /users/login.
 *
 * @param req request object
 * @param res response object
 * @sends: User not found, incorrect password, successfully logged in or error message.
 */
async function loginUser(req, res, next) {
	passport.authenticate("local", (err, user) => {
		if (err) {
			res.status(500).json({message: err});
			return;
		}

		if (!user) {
			res.status(400).json({message: "User is not registered"});
			return;
		}

		req.logIn(user, (err) => {
			if (err) {
				res.status(500).json({message: err});
				return;
			}

			res.json({message: "Logged in"})
		});
  })(req, res, next);
}

/**
 * Handles a GET request to log out the user on the endpoint /users/logout.
 *
 * @param req request object
 * @param res response object
 * @sends: User is logged out
 */
async function logoutUser(req, res) {
	req.logout();
	res.status(200);
}

/**
 * Handles a PATCH request to update a user's details on the endpoint /users/:id.
 *
 * @param req request object
 * @param res response object
 * @sends: Updates the user object
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

/**
 * Handles a GET request to get the currently logged in user's details on the endpoint /users/current.
 *
 * @param req request object
 * @param res response object
 * @sends: The user object of the currently logged in user
 */
async function getCurrentUser(req, res) {
	if (req.user) {
		const user = {
		"_id": req.user["_id"],
		givenName: req.user.givenName,
		familyName: req.user.familyName,
		email: req.user.email
		}

		res.json(user);
	} else {
		res.status(400).json({message: "User not logged in"});
	}
}

module.exports = { getUsers, getUser, addUser, loginUser, logoutUser, updateUser, getCurrentUser };