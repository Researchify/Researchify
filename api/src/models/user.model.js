/**
 * This module exports a "User" mongoose Schema, which stores a user's registration details.
 */
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    orgName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {timestamps: true})

const User = mongoose.model('user', userSchema);

module.exports = User;