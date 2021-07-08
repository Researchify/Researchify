/**
 * This module exports a "Team" mongoose Schema, which represents a researcher team.
 */
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
    },
    areaOfInterest: {
      type: [
        {
          type: String,
          minlength: 1,
        },
      ],
    },
    twitterHandle: {
      type: String,
    },
    templateId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'template',
      required: true,
    },
    teamMembers: [
      {
        fullName: { type: String, required: true, minLength: 3 },
        position: { type: String, required: true },
        summary: { type: String, required: true, minLength: 3 },
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.model('team', teamSchema);

module.exports = Team;
