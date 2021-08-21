/**
 * This module exports a "Website" mongoose Schema, which represents a team's web page.
 */
const mongoose = require('mongoose');

const { layoutOptionEnum, sortingOptionEnum } = require('../config/publication');

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
        enum: layoutOptionEnum
      }, 
      sortBy: { 
        type: String, 
        required: false,
        enum: sortingOptionEnum
      } 
    },
  },
  { timestamps: true }
);

const Website = mongoose.model('website', websiteSchema);

module.exports = Website;
