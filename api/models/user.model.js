/**
 * This module exports a "User" mongoose Schema, which stores a user's registration details.
 */
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, {timestamps: true})

const User = mongoose.model('user', userSchema);

module.exports = User;