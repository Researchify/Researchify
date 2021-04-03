/**
 * This module exports a "Publication" mongoose Schema, which represents a researcher team's publication..
 */
const mongoose = require('mongoose');


const publicationSchema = new mongoose.Schema({
    title: String,
    teamSize: Number,
    leadResearcher: String
}, {timestamps: true})

const Publication = mongoose.model('publication', publicationSchema);

module.exports = Publication;