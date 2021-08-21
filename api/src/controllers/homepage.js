/**
 * This module contains handlers for the "homepage" route.
 * @module homepage
 */
const Homepage = require('../models/homepage.model');
const { fillErrorObject } = require('../middleware/error');

/**
 * Get homepage content on /homepage/:team_id
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function getHomepage(req, res, next) {
  const { team_id } = req.params;
  try {
    const foundHomepage = await Homepage.findOne({ teamId: team_id });
    if (foundHomepage) {
      return res.status(200).json(foundHomepage);
    }
    const emptyHomepage = { teamId: team_id, aboutUs: [''] };
    return res.status(200).json(emptyHomepage);
  } catch (err) {
    next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Create a new homepage instance for team on /homepage/:team_id
 * @param {*} req
 * @param {*} res
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
        { new: true }
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
