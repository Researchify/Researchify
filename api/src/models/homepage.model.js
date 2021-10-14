/**
 * This module exports a "Homepage" mongoose Schema, which represents their homepage.
 * Associated to a trigger, a homepage document of a team will be created automaically in db when a new team is created in db.
 */
const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'team',
      required: true,
    },
    // `aboutUs` stores a HTML string.
    aboutUs:
    {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

const Homepage = mongoose.model('homepage', homepageSchema);

module.exports = Homepage;
