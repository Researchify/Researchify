/**
 * This module exports an "Awards" mongoose Schema, which represents a researcher team's Awards..
 */
 const mongoose = require('mongoose');

 const publicationSchema = new mongoose.Schema({
     teamId: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'team',
         required: true
     },
     title: {
        type: String,
        required: true,
        minlength: 3
    },
     recipients: {
        type: [{
            type: String,
            minlength: 1
        }],
        required: true
    },
    yearReceived: {
        type: Date
    },timestamps: true})

const Publication = mongoose.model('publication', publicationSchema)

module.exports = Award;
