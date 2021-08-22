/**
 * This module exports a "Homepage" mongoose Schema, which represents their homepage.
 */
const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'team',
      required: true,
    },
    // `aboutUs` stores a list of strings.
    // Each string in list is a paragraph.
    aboutUs: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const Homepage = mongoose.model('homepage', homepageSchema);

module.exports = Homepage;
