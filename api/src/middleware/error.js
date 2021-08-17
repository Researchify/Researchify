/**
 * This module consists of a custom error handling middleware function to handle
 * all Express errors.
 *
 * Ref: https://expressjs.com/en/guide/error-handling.html
 */
const logger = require('winston');

/**
 * Utility function to construct an error object used by our custom error handling middleware.
 *
 * @param code the HTTP response code of the error encountered
 * @param message a message to use that describes the error
 * @param err an optional list of primitive error objects that caused the error
 */
function fillErrorObject(code, message, err = []) {
  const tzOffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(Date.now() - tzOffset).toISOString();

  return {
    code,
    message,
    errors: [...err],
    timestamp: localISOTime,
  };
}

/**
 * A simple "catch-all" error handler middleware that uses custom error objects
 * to log and report errors back to the client.
 *
 * @param err a custom error object
 * @param req the express request
 * @param res the express response
 * @param next the handle of the next middleware function (currently non-existent)
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err) {
    logger.error('Error encountered while processing request: ', err);
    res.status(err.code).json(err);
  } else {
    // If error object is not passed, send a generic server error
    logger.error('Some unknown error occurred while processing request.');
    res.status(500)
      .send('Something went wrong in the backend that couldn\'t be handled!');
  }
}

module.exports = { fillErrorObject, errorHandler };
