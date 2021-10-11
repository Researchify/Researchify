/**
 * This module exports a "Achievement" mongoose Schema, which represents the achievements/awards of a team
 */
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'team',
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
    },
    yearAwarded: {
      type: Number,
      required: true,
    },
  },
);

const Achievement = mongoose.model('achievement', achievementSchema);

module.exports = Achievement;
