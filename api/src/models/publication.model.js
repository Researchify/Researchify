/**
 * This module exports a "Publication" mongoose Schema, which represents a researcher team's publication..
 */
const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'team',
        required: true
    },
    authors: {
        type: [{
            type: String,
            minlength: 1
        }],
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    thumbnail: {
        type: String
    },
    link: {
        type: String
    },
    description: {
        type: String,
        required: true,
        minlength: 5
    },
    summary: {
        type: String,
        minlength: 5
    },
    citedBy: {
        type: Number,
        min: 0
    },
    yearPublished: {
        type: Date
    },
    category: {
        type: {
            type: String,
            enum: ['CONFERENCE', 'JOURNAL', 'OTHER'],
            required: true
        },
        categoryTitle: {
            type: String,
            required: true,
            minlength: 3
        },
        volume: String,
        issue: String,
        pages: String,
        publisher: String
    },
}, {timestamps: true})

const Publication = mongoose.model('publication', publicationSchema);

module.exports = Publication;