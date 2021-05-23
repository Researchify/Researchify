/**
 * This module exports a "Team" mongoose Schema, which represents a researcher team.
 */
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    orgName: {
      type: String,
      required: true
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
    githubToken: {
      type: String,
    },
    githubUsername: {
      type: String,
    },
    templateId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "template",
      required: false,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("team", teamSchema);

module.exports = Team;
