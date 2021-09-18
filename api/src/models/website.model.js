/**
 * This module exports a "Website" mongoose Schema, which represents a team's web page.
 * Associated to a trigger, a website document of a team will be created automaically in db when a new team is created in db.
 */
const mongoose = require('mongoose');

const { groupByOptions, sortingOptions } = require('../config/publication');

const { themeOptions, layoutOptions } = require('../config/website');

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
      minlength: 3,
      maxlength: 30,
    },
    layout: {
      type: String,
      enum: layoutOptions,
      required: false,
    },
    theme: {
      type: String,
      enum: themeOptions,
      required: false,
    },
    publicationOptions: {
      groupBy: {
        type: String,
        required: false,
        enum: groupByOptions,
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
