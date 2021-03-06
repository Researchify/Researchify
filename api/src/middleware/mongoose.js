/**
 * This module contains mongoose validation middleware.
 */
const mongoose = require('mongoose');

const { fillErrorObject } = require('./error');

async function validateObjectId(_id, type, res, next) {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    next(
      fillErrorObject(400, 'Validation error', [
        `Given ${type} id is not in a valid hexadecimal format`,
      ]),
    );
  } else {
    next();
  }
}

async function validatePublicationObjectId(req, res, next) {
  const { id: _id } = req.params;
  validateObjectId(_id, 'publication', res, next);
}

async function validateAchievementObjectId(req, res, next) {
  const { id: _id } = req.params;
  validateObjectId(_id, 'achievement', res, next);
}

async function validateTeamObjectId(req, res, next) {
  const { teamId } = req.params;
  validateObjectId(teamId, 'team', res, next);
}

module.exports = { validateTeamObjectId, validateAchievementObjectId, validatePublicationObjectId };
