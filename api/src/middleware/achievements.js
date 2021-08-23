/**
 * This module contains middleware functions for the achievements route (../routes/achievements.js).
 */

 const { body, validationResult } = require('express-validator');
 const { fillErrorObject } = require('./error');
 
 
 
 /**
  * Handles the validation when creating (POST) a new achievement in the database.
  * There are validators for: title, description.
  * @returns 400 if validation for any attribute fails, otherwise move to next function in the chain
  */
 const createAchievementValidation = [
   body('title', 'Error: Title must be at least 3 characters.')
     .trim()
     .isLength({ min: 3, max: 50 })
     .escape(),
   body('description', 'Error: Description must be at least 5 characters.')
     .trim()
     .isLength({ min: 3, max: 500 })
     .escape(),
   (req, res, next) => {
     // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       console.log({ errors: errors.array() });
       next(
         fillErrorObject(
           400,
           'Validation error',
           errors.errors.map((a) => a.msg)
         )
       );
     } else {
       next();
     }
   },
 ];
 
 module.exports = { createAchievementValidation };
 