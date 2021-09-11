/**
 * This module contains handlers for the "theme" route.
 * @module theme
 */
const Theme = require('../models/editor/theme.model');

/**
 * Find and assign theme id to the team, if not found, create a new one
 * @param {*} req request object, containing theme data object in the body
 * @param {*} res response object, found/created theme data
 * @returns
 */
async function findOrCreateTheme(req, res) {
  const themeData = req.body;
  try {
    const foundTheme = await Theme.findOne(themeData);
    if (!foundTheme) {
      const createdTheme = await Theme.create(themeData);
      return res.status(201).json(createdTheme);
    }
    return res.status(200).json(foundTheme);
  } catch (err) {
    return res.status(404).json(`Error: ${err.message}`);
  }
}

module.exports = {
  findOrCreateTheme,
};
