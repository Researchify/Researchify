const mongoose = require('mongoose');
const { fillErrorObject } = require('../middleware/error');


async function validateObjectId(req, res, next) {
  let _id;
  if (req.params.id === null) {
    // check teamid in the endpoint
    _id = req.params.team_id;
  } else {
    _id = req.params.id;
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
      console.log("in here");
    next(
      fillErrorObject(400, 'Validation error has occurred', [
        'Given publication id is not in a valid hexadecimal format',
      ])
    );
  } else {
    next();
  }
}

module.exports = { validateObjectId };
