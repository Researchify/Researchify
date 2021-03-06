/**
 * This module contains middleware functions for the publications route (../routes/publications.js).
 */
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const { categoryTypes } = require('../config/publication');
const { scrapingConfig } = require('../config/scraping');
const { fillErrorObject } = require('./error');

/**
 * Handles the validation when creating (POST) a new publication in the database.
 * There are validators for: authors, title, description, summary, citedBy.
 * @returns 400 if validation for any attribute fails, otherwise move to next function in the chain
 */
const createPublicationValidation = [
  body('authors', 'Error: Authors must not be empty.').isArray().notEmpty(),
  body('title', 'Error: Title must be at least 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('description', 'Error: Description must be at least 5 characters.')
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body('summary', 'Error: Summary must be at least 5 characters.')
    .if(body('summary').exists())
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body(
    'citedBy',
    'Error: citedBy needs to be a number and have a value of 0 or greater.',
  )
    .if(body('citedBy').exists())
    .isInt({ min: 0 }),
  body(
    'link',
    'Error: Link URL provided is not a valid URL, including the protocol (http/https).',
  )
    .if(body('link').exists().notEmpty())
    .isURL({
      require_protocol: true,
      require_valid_protocol: true,
      require_host: true,
      validate_length: true,
    }),
  body(
    'thumbnail',
    'Error: Thumbnail URL provided is not a valid URL, including the protocol (http/https).',
  )
    .if(body('thumbnail').exists().notEmpty())
    .optional(true)
    .isURL({
      require_protocol: true,
      require_valid_protocol: true,
      require_host: true,
      validate_length: true,
    }),
  body('yearPublished', 'Error: Year should be in a string in the format YYYY.')
    .if(body('yearPublished').exists())
    .isLength(4),
  body('category.type', 'Error: Category type must not be empty.').notEmpty(),
  body(
    'category.type',
    `Error: Category type does not match any of ${categoryTypes}.`,
  )
    .if(body('category.type').exists().notEmpty())
    .isIn(categoryTypes),
  body(
    'category.categoryTitle',
    'Error: Category title must not be empty.',
  ).notEmpty(),
  body(
    'category.categoryTitle',
    'Error: Category title must be at least 3 characters.',
  )
    .if(body('category.categoryTitle').exists().notEmpty())
    .trim()
    .isLength({ min: 3 }),
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        fillErrorObject(
          400,
          'Validation error',
          errors.errors.map((a) => a.msg),
        ),
      );
    } else {
      next();
    }
  },
];

async function validateAuthorId(req, res, next) {
  const { gScholarUserId: _id } = req.params;
  if (_id.length !== 12) {
    return next(
      fillErrorObject(400, 'Validation error', [
        'Google Scholar User ID needs to be 12 characters long',
      ]),
    );
  }

  try {
    await axios.get(`${scrapingConfig.baseUrl}${_id}`);
    return next();
  } catch (error) {
    // if you mess around with the user id you only get 404
    return next(
      fillErrorObject(error.response.status, 'Validation error', [
        'No Google Scholar user profile found with the given id',
      ]),
    );
  }
}

module.exports = { createPublicationValidation, validateAuthorId };
