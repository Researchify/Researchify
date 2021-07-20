const mongoose = require('mongoose');
const { fillErrorObject } = require('../middleware/error');

async function validateObjectId(_id, type, res, next) {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log('in here');
    console.log(_id);
    next(
      fillErrorObject(400, 'Validation error has occurred', [
        'Given ' + type + ' id is not in a valid hexadecimal format',
      ])
    );
  } else {
    next();
  }
}

async function validatePublicationObjectId(req, res, next) {
  const { id: _id } = req.params;
  validateObjectId(_id, 'publication', res, next);
}

async function validateTeamObjectId(req, res, next) {
  const { team_id } = req.params;
  validateObjectId(team_id, 'team', res, next);
}

module.exports = { validateTeamObjectId, validatePublicationObjectId };
