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

  module.exports = { createAchievement }