/**
 * @file This module contains handlers for the "achievements" route.
 * @module achievements
 */

 const Achievement = require('../models/achievement.model');

 const Team = require('../models/team.model');

 const { fillErrorObject } = require('../middleware/error');

/**
 * Handles a POST request, which will create an achievement/award in the database using the endpoint /achievements.
 * @param req request object - achievement in body (see Achievement model)
 * @param res response object
 * @returns 201: the achievement has been created
 * @returns 404: no team was found in the database to associate the achievement with
 * @returns 500: server encountered an unexpected condition
 */
 function createAchievement(req, res, next) {
    const achievement = req.body;
    
    // Check if teamId provided is part of an existing team
    const result = Team.findById({ _id: achievement.teamId }).catch((err) =>
      next(fillErrorObject(500, 'Server error', [err.errors]))
    );

    // Create achievement if teamId is valid, return error if not
    if (result == null) {
      next(fillErrorObject(404, 'Validation error', ['Team was not found']));
    } else {
        Achievement.create(achievement)
        .then((createdAchievement) => res.status(201).json(createdAchievement))
        .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
    }
  }

  /**
 * Handles a DELETE request to delete an achievement/award by the mongo object id on the endpoint /achievements/:id.
 *
 * @param req request object - the achievement id (mongo object id) given in the url
 * @param res response object
 * @returns 200: achievement deleted successfully
 * @returns 404: achievement not found
 * @returns 401: error deleting achievement
 */
function deleteAchievement(req, res, next) {
    const { id: _id } = req.params;
    
    // Try to remove achievement using id provided
    Achievement.findByIdAndRemove(_id)
      .then((foundAchievement) => {
        // Return error if the achievement does not exist
        if (foundAchievement === null) {
          next(
            fillErrorObject(400, 'Validation error', [
              'Achievement could not be found',
            ])
          );
        } else {
            // Return success message
            return res.status(200).json({ message: 'Achievement deleted successfully.' });
        }
      })
      .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
  }


  module.exports = { createAchievement, deleteAchievement }