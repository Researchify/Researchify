/**
 * This module exports a "Team" mongoose Schema, which represents a researcher team.
 * Post middleware has been implemented to trigger the creation of associated
 * documents upon team registration, and vice-versa for deletion.
 */
const mongoose = require('mongoose');
const logger = require('winston');

const Website = require('./website.model');
const Homepage = require('./homepage.model');
const Publication = require('./publication.model');
const Achievement = require('./achievement.model');

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
          required: true,
          minLength: 3,
        },
        position: {
          type: String,
          required: false,
          maxLength: 25,
        },
        summary: {
          type: String,
          required: false,
          maxLength: 200,
        },
        memberPic: {
          type: String,
          required: false,
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
      teamId: doc._id, publicationOptions: { groupBy: 'None', sortBy: 'Title' }, template: { layout: '1', theme: 'light' },
    });
    await Homepage.create({ teamId: doc._id, aboutUs: '' });
  } catch (err) {
    logger.error('Failed to create associated documents on team creation.');
  }
});

// Post middleware/trigger to delete dependent documents upon team deletion.
teamSchema.post('remove', async (doc) => {
  try {
    await Website.deleteMany({ teamId: doc._id });
    await Homepage.deleteMany({ teamId: doc._id });
    await Publication.deleteMany({ teamId: doc._id });
    await Achievement.deleteMany({ teamId: doc._id });

    logger.info(`Team ${doc.teamName} & associated documents have been deleted.`);
  } catch (err) {
    logger.error('Failed to delete associated documents on team deletion.');
  }
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;
