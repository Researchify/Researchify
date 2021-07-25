/**
 * This module exports a "Theme" mongoose Schema, which represents a predefined set of theme preferences for their site.
 */
const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema(
  {
    layout: {
      type: Number,
      required: true,
    },
    primaryColor: {
      type: String,
      required: true,
      minlength: 4, // e.g. #09C
      maxlength: 7, // e.g. #0099CC
      uppercase: true,
      trim: true,
      match: /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/,
    },
    secondaryColor: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 7,
      uppercase: true,
      trim: true,
      match: /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/,
    },
  },
  { timestamps: true }
);

const Theme = mongoose.model('theme', themeSchema);

module.exports = Theme;
