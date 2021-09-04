/**
 * This module exports a "Website" mongoose Schema, which represents a team's web page.
 * Associated to a trigger, a website document of a team will be created automaically in db when a new team is created in db.
 */
const mongoose = require('mongoose');

const { layoutOptions, sortingOptions } = require('../config/publication');

const websiteSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'team',
      required: true,
    },
    pages: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    publicationOptions: {
      layout: {
        type: String,
        required: false,
        enum: layoutOptions,
      },
      sortBy: {
        type: String,
        required: false,
        enum: sortingOptions,
      },
    },
  },
  { timestamps: true },
);

const Website = mongoose.model('website', websiteSchema);

module.exports = Website;
