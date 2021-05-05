/**
 * This module contains middleware functions for the publications route (../routes/publications.js).
 */

const { body,validationResult } = require('express-validator');

/**
 * Handles the validation when creating (POST) a new publication in the database.
 * There are validators for: authors, title, description, summary, citedBy.
 * @returns 400 if validation for any attribute fails, otherwise move to next function in the chain
 */
const createPublicationValidation = [
    body("authors", "Error: Authors must not be empty.")
      .isArray()
      .notEmpty(),
    body("title", "Error: Title must be at least 3 characters.")
      .trim()
      .isLength({ min: 3 })
      .escape(),
    body("description", "Error: Description must be at least 5 characters.")
      .trim()
      .isLength({ min: 5 })
      .escape(),
    body("summary", "Error: Summary must be at least 5 characters.")
      .if(body("summary").exists())
      .trim()
      .isLength({ min: 5 })
      .escape(),
    body("citedBy", "Error: citedBy needs to be a number and have a value of 0 or greater.")
      .if(body("citedBy")
      .exists())
      .isInt({ min: 0 }),
    body("link", "Error: Link URL provided is not a valid URL, including the protocol (http/https).")
      .if(body("link")
      .exists()
      .notEmpty())
      .isURL({ 
        "require_protocol": true, 
        "require_valid_protocol": true, 
        "require_host": true,
        "validate_length": true }),
    body("thumbnail", "Error: Thumbnail URL provided is not a valid URL, including the protocol (http/https).")
      .if(body("thumbnail")
      .exists()
      .notEmpty())
      .optional(true)
      .isURL({ 
        "require_protocol": true, 
        "require_valid_protocol": true, 
        "require_host": true,
        "validate_length": true }),
    body("yearPublished", "Error: Year should be in a string in the format YYYY.")
      .if(body("yearPublished")
      .exists())
      .isLength(4),
      (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
  ];

  module.exports = { createPublicationValidation }