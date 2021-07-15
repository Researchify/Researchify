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
    twitterHandle: {
      type: String,
    },
    templateId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'template',
      required: false,
    },
    teamMembers: [
      {
        fullName: { type: String, required: false, minLength: 3 },
        position: { type: String, required: false },
        summary: { type: String, required: false, minLength: 3 },
      },
    ],
    githubToken: {
      type: String,
      required: false 
    },
    repoName: {
      type: String, 
    },
  },
  { timestamps: true }
);

const Team = mongoose.model('team', teamSchema);

module.exports = Team;
