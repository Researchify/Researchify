/**
 * This module contains middleware functions for the team route (/routes/teams.js).
 */

const mongoose = require('mongoose');

const { body, validationResult } = require('express-validator');

const Team = require('../models/team.model');

async function validateTeamId(req, res, next) {
  const { team_id } = req.params;
  let foundTeam;
  if (mongoose.Types.ObjectId.isValid(team_id)) {
    foundTeam = await Team.findById(team_id).select('_id teamName orgName teamMembers');
    console.log(foundTeam);

    if (foundTeam == null) {
      return res.status(404).send(`Error: No team found with given id.`);
    }
  } else {
    return res
      .status(400)
      .send('Error: Given team id is not in a valid hexadecimal format.');
  }

  req.foundTeam = foundTeam; // todo: does this need to be set inside middleware?
  next();
}

const validateTwitterHandle = [
  body(
    'twitterHandle',
    'Error: Twitter handle must be between 0 to 15 characters.'
  )
    .isLength({ min: 0, max: 15 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateTeamId, validateTwitterHandle };
