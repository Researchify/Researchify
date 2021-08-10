/**
 * This module contains middleware functions for the team route (/routes/teams.js).
 */


const { body, validationResult } = require('express-validator');

const Team = require('../models/team.model');

const { fillErrorObject } = require('./error');

async function validateTeamId(req, res, next) {
  const { team_id } = req.params;
  let foundTeam;
  foundTeam = await Team.findById(team_id).select('_id teamName orgName email teamMembers');
  console.log(foundTeam);

  if (foundTeam == null) {
    next(
      fillErrorObject(404, 'Validation error', [
        'No team found with the given id',
      ])
    );
  }

  req.foundTeam = foundTeam; // todo: does this need to be set inside middleware?
  next();
}

const validateTwitterHandle = [
  body(
    'twitterHandle',
    'Error: Twitter handle must be between 0 to 15 characters.' // 0 because it means remove the handle
  )
    .isLength({ min: 0, max: 15 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        fillErrorObject(400, 'Validation error', errors.errors.map(a => a.msg))
      );
    } else {
      next();
    }
  },
];

module.exports = { validateTeamId, validateTwitterHandle };
