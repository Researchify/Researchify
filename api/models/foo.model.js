/**
 * This module exports a "FooMessage" mongoose Schema, which represents a foo message.
 */
const mongoose = require('mongoose');


const fooSchema = new mongoose.Schema({
    title: String
}, {timestamps: true})

const FooMessage = mongoose.model('FooMessage', fooSchema);

module.exports = FooMessage;