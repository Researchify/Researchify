/**
 * This module exports a "Template" mongoose Schema, which represents a predefined set of templates for their site.
 */
const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    isDefault: {
      type: Boolean,
      required: true,
    },
    themeId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'theme',
      required: true,
    },
  },
  { timestamps: true }
);

const Template = mongoose.model('template', templateSchema);

module.exports = Template;
