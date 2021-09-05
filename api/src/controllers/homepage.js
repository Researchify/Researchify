/**
 * This module contains handlers for the "homepage" route.
 * @module homepage
 */
const Homepage = require('../models/homepage.model');
const { fillErrorObject } = require('../middleware/error');

/**
 * Get homepage content on /homepage/:team_id
 * @returns 200: return the team's homepage info
 * @returns 404: team's homepage info not found
 * @returns 500: server error
 * @returns
 */
async function getHomepage(req, res, next) {
  const { team_id } = req.params;
  try {
    const foundHomepage = await Homepage.findOne({ teamId: team_id });
    if (foundHomepage) {
      return res.status(200).json(foundHomepage);
    }
    return next(fillErrorObject(404, 'Validation error', ['No homepage found with the given team_id']));
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Create a new homepage instance for team on /homepage/:team_id
 * @param {*} req request object, containing team id in the url, homepage data to be post in the body
 * @param {*} res response object, posted homepage data of the team
 * @returns
 */
async function updateHomepage(req, res, next) {
  const { team_id } = req.params;
  const homepageData = req.body;
  try {
    const foundHomepage = await Homepage.findOne({ teamId: team_id });
    if (foundHomepage) {
      const updatedHomepage = await Homepage.findOneAndUpdate(
        { teamId: team_id },
        homepageData,
        { new: true },
      );
      return res.status(200).json(updatedHomepage);
    }
    return next(fillErrorObject(404, 'Validation error', ['No homepage found with the given team_id']));
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

module.exports = {
  getHomepage,
  updateHomepage,
};
