/**
 * @file This module contains handlers for the "achievements" route.
 * @module achievements
 */
 const mongoose = require('mongoose');

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
 * Handles a GET request, which will retrieve all the achievements/awards by team in the endpoint /achievements/team/:team_id.
 *
 * @param req request object - team id (mongo object id) given in the url
 * @param res response object - a list of achievements (see Achievement model)
 * @returns 200: a list of achievements by the given team id
 * @returns 400: given team id is not in a valid hexadecimal format
 * @returns 404: the specified team or achievement was not found
 */
function getAllAchievementsByTeam(req, res, next) {
    const { team_id: _id } = req.params;
    
    // Store achievements into list, sorted by title 
    Achievement.aggregate([
      {
        $match: { teamId: mongoose.Types.ObjectId(_id) },
      }, 
      {
        $sort: { title: 1 },
      },
    ])
      .then((foundAchievement) => res.status(200).json(foundAchievement))
      .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
  }

  /**
 * Handles a DELETE request to delete an achievement/award by the mongo object id on the endpoint /achievements/:id.
 *
 * @param req request object - the achievement id (mongo object id) given in the url
 * @param res response object
 * @returns 200: achievement deleted successfully
 * @returns 404: achievement not found
 * @returns 400: error deleting achievement
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

/**
 * Handles a PATCH request, which represents updating a specific achievement/award, by the mongo object id on the /achievements/:id endpoint.
 *
 * @param req request object - the achievement id given in the url, achievement in body (see Achievement model)
 * @param res response object - updated achievement
 * @returns 200: the newly updated achievement
 * @returns 404: achievement not found
 */
 function updateAchievement(req, res, next) {
    const { id: _id } = req.params;
    const achievement = req.body;

    // Try to update achievement using id provided
    Achievement.findByIdAndUpdate(_id, achievement, {
      new: true,
      runValidators: true,
    })
      .then((updatedAchievement) => {
        // Return error if achievement does not exist
        if (updatedAchievement == null) {
          next(
            fillErrorObject(404, 'Validation error', [
              'Achievement could not be found',
            ])
          );
        } else {
            // Return updated achievement
            return res.status(200).json(updatedAchievement);
        }
      })
      .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
  }

  module.exports = { createAchievement, getAllAchievementsByTeam, deleteAchievement, updateAchievement }