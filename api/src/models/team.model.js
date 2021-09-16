/**
 * This module exports a "Team" mongoose Schema, which represents a researcher team.
 * Post middleware has been implemented to trigger the creation of associated
 * documents upon team registration.
 */
const mongoose = require('mongoose');
const logger = require('winston');

const Website = require('./website.model');
const Homepage = require('./homepage.model');

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      minLength: 3,
    },
    orgName: {
      type: String,
      required: true,
      minLength: 3,
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
      type: String,
      required: false,
    },
    teamMembers: [
      {
        fullName: {
          type: String,
          required: false,
          minLength: 3,
        },
        position: {
          type: String,
          required: false,
        },
        summary: {
          type: String,
          required: false,
          minLength: 3,
        },
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
    profilePic: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

// Post middleware/trigger to create associated documents when a team has
// registered. See: https://stackoverflow.com/a/57971800/15507541.
// https://mongoosejs.com/docs/middleware.html#post
teamSchema.post('save', async (doc) => {
  try {
    await Website.create({
      teamId: doc._id, publicationOptions: { groupBy: 'None', sortBy: 'Title' }, layout: '1', theme: '2',
    });
    await Homepage.create({ teamId: doc._id });
  } catch (err) {
    logger.error('Failed to create associated documents on team creation.');
  }
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;
