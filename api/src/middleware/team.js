/**
 * This module contains middleware functions for the team route (/routes/teams.js).
 */

const mongoose = require('mongoose');

const { body, validationResult } = require('express-validator');

const Team = require('../models/team.model');

const { fillErrorObject } = require('./error');

async function validateTeamId(req, res, next) {
  const { team_id } = req.params;
  let foundTeam;
  if (mongoose.Types.ObjectId.isValid(team_id)) {
    foundTeam = await Team.findById(team_id).select('_id teamName orgName');
    console.log(foundTeam);

    if (foundTeam == null) {
      next(
        fillErrorObject(404, 'Validation error has occurred', [
          'No team found with the given id',
        ])
      );
    }
  } else {
    next(
      fillErrorObject(400, 'Validation error has occurred', [
        'Given team id is not in a valid hexadecimal format',
      ])
    );
  }

  req.foundTeam = foundTeam; // todo: does this need to be set inside middleware?
  next();
}

const validateTwitterHandle = [
  body(
    'twitterHandle',
    'Error: Twitter handle must be between 1 to 15 characters.'
  )
    .isLength({ min: 1, max: 15 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        fillErrorObject(400, 'Validation error has occurred', errors.array())
      );
    }
    next();
  },
];

module.exports = { validateTeamId, validateTwitterHandle };
