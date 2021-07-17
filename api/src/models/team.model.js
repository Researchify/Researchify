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
    orgName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
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
      type: String,
      required: false,
    },
    teamMembers: [
      {
        fullName: { type: String, required: false, minLength: 3 },
        position: { type: String, required: false },
        summary: { type: String, required: false, minLength: 3 },
      },
    ],
    githubUsername: {
      type: String,
      required: false,
    },
    themeId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'theme',
    },
  },
  { timestamps: true }
);

const Team = mongoose.model('team', teamSchema);

module.exports = Team;
