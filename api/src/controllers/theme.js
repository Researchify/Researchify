/**
 * This module contains handlers for the "theme" route.
 * @module theme
 */
const Theme = require('../models/editor/theme.model');

/**
 *
 * @param {*} req
 * @param {*} res
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
    res.status(404).json(`Error: ${err.message}`);
  }
}

module.exports = {
  findOrCreateTheme,
};
