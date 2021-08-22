/**
 * This module contains handlers for the "homepage" route.
 * @module homepage
 */
const Homepage = require('../models/homepage.model');
const { fillErrorObject } = require('../middleware/error');

/**
 * Get homepage content on /homepage/:team_id
 * @param {*} req request object, containing team id in url
 * @param {*} res response object, the homepage data of team
 * @returns
 */
async function getHomepage(req, res, next) {
  const { team_id } = req.params;
  try {
    const foundHomepage = await Homepage.findOne({ teamId: team_id });
    if (foundHomepage) {
      return res.status(200).json(foundHomepage);
    }
    // note: each string in `aboutUs` is a paragraph
    const emptyHomepage = { teamId: team_id, aboutUs: [''] };
    return res.status(200).json(emptyHomepage);
  } catch (err) {
    next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Create a new homepage instance for team on /homepage/:team_id
 * @param {*} req request object, containing team id in the url, homepage data to be post in the body
 * @param {*} res response object, posted homepage data of the team
 * @returns
 */
async function createOrUpdateHomepage(req, res, next) {
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
    const createdHomepage = await Homepage.create(homepageData);
    return res.status(201).json(createdHomepage);
  } catch (err) {
    next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

module.exports = {
  getHomepage,
  createOrUpdateHomepage,
};
