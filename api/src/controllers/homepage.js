/**
 * This module contains handlers for the "homepage" route.
 * @module homepage
 */
const Homepage = require('../models/editor/homepage.model');
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
    return res.status(404).json('Homepage not found');
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
      const updatedHomepage = await Homepage.updateOne(
        { teamId: team_id },
        homepageData
      );
      return res.status(200).json(updatedHomepage);
    } else {
      const createdHomepage = await Homepage.create(homepageData);
      return res.status(201).json(createdHomepage);
    }
  } catch (err) {
    next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

module.exports = {
  getHomepage,
  createOrUpdateHomepage,
};
