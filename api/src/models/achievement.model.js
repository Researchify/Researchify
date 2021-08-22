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
      },
      description: {
          type: String
      },
      yearAwarded: {
          type: Number
      }
    }
)

const Achievement = mongoose.model('achievement', achievementSchema);

module.exports = Achievement;
