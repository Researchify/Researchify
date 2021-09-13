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
async function createAchievement(req, res) {
  const achievement = req.body;

  try {
    // Check if teamId provided is part of an existing team
    const result = await Team.findById({ _id: achievement.teamId });

    if (result == null) {
      res.send(
        fillErrorObject(404, 'Validation error', ['Team was not found']),
      );
    } else {
      // Create new achievement
      const createdAchievement = await Achievement.create(achievement);
      res.status(201).json(createdAchievement);
    }
  } catch (err) {
    res.send(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Handles a GET request, which will retrieve all the achievements/awards by team in the endpoint /achievements/team/:teamId.
 *
 * @param req request object - team id (mongo object id) given in the url
 * @param res response object - a list of achievements (see Achievement model)
 * @returns 200: a list of achievements by the given team id
 * @returns 500: server encountered an unexpected condition
 */
async function getAllAchievementsByTeam(req, res) {
  const { teamId: _id } = req.params;

  try {
    // Store achievements into list, sorted by title in alphabetical order
    const foundAchievements = await Achievement.aggregate([
      {
        $match: { teamId: mongoose.Types.ObjectId(_id) },
      },
      {
        $sort: { title: 1 },
      },
    ]);

    res.status(200).json(foundAchievements);
  } catch (err) {
    res.send(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Handles a DELETE request to delete an achievement/award by the mongo object id on the endpoint /achievements/:id.
 *
 * @param req request object - the achievement id (mongo object id) given in the url
 * @param res response object
 * @returns 200: achievement deleted successfully
 * @returns 400: error deleting achievement
 * @returns 500: server encountered an unexpected condition
 */
async function deleteAchievement(req, res) {
  const { id: _id } = req.params;

  try {
    // Try to remove achievement using id provided
    const foundAchievement = await Achievement.findByIdAndRemove(_id);

    // Return error if the achievement does not exist
    if (foundAchievement === null) {
      res.send(fillErrorObject(400, 'Validation error', [
        'Achievement could not be found',
      ]));
    } else {
      // Return success message
      res.status(200).json({ message: 'Achievement deleted successfully.' });
    }
  } catch (err) {
    res.send(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Handles a PATCH request, which represents updating a specific achievement/award, by the mongo object id on the /achievements/:id endpoint.
 *
 * @param req request object - the achievement id given in the url, achievement in body (see Achievement model)
 * @param res response object - updated achievement
 * @returns 200: the newly updated achievement
 * @returns 404: achievement not found
 * @returns 500: server encountered an unexpected condition
 */
async function updateAchievement(req, res) {
  const { id: _id } = req.params;
  const achievement = req.body;

  try {
    // Try to update achievement using id provided
    const updatedAchievement = await Achievement.findByIdAndUpdate(_id,
      achievement, {
        new: true,
        runValidators: true,
      });

    // Return error if achievement does not exist
    if (updatedAchievement == null) {
      res.send(fillErrorObject(404, 'Validation error', [
        'Achievement could not be found',
      ]));
    } else {
      // Return updated achievement
      res.status(200).json(updatedAchievement);
    }
  } catch (err) {
    res.send(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

module.exports = {
  createAchievement,
  getAllAchievementsByTeam,
  deleteAchievement,
  updateAchievement,
};
