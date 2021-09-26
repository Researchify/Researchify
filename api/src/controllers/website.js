/**
 * This module contains handlers for the "clientWebsite" route.
 * @module website
 */
const Website = require('../models/website.model');

const { fillErrorObject } = require('../middleware/error');

/**
 * Handle GET request from /clientWebsite/:teamId
 * @param {*} req request object, containing teamId
 * @param {*} res response object
 * @returns 200: return the team's website info
 * @returns 404: team's website info not found
 * @returns 500: server error
 */
async function getWebPageDetails(req, res, next) {
  const { teamId } = req.params;
  try {
    const foundWebsiteInfo = await Website.findOne({ teamId });
    if (foundWebsiteInfo) {
      return res.status(200).json(foundWebsiteInfo);
    }
    return next(fillErrorObject(404, 'Validation error', ['No webpage detail found with the given teamId']));
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Adds details about a new page created in the website
 * @param {*} req request object, containing the pageName and teamId
 * @param {*} res response object
 * @returns 200: Web page successfully added to DB
 * @returns 404: team's website info not found
 * @returns 500: Server error while saving new page name to DB
 */
async function addWebPage(req, res, next) {
  const { teamId } = req.params;
  try {
    const foundWebsiteInfo = await Website.findOne({ teamId });
    if (foundWebsiteInfo) {
      foundWebsiteInfo.pages.push(req.body.pageName);
      await foundWebsiteInfo.save();
      return res.status(200).json(foundWebsiteInfo);
    }
    return next(fillErrorObject(404, 'Validation error', ['No webpage detail found with the given teamId']));
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Deletes details about a client web-page
 * @param {*} req request object, containing the pageName and teamId
 * @param {*} res response object
 * @returns 200: Web page successfully deleted in the DB
 * @returns 400: Team Id given does not have a website created yet
 * @returns 500: Server error while saving new page name to DB
 */
async function deleteWebPage(req, res, next) {
  const { teamId } = req.params;
  try {
    const foundWebsiteInfo = await Website.findOne({ teamId });
    if (foundWebsiteInfo) {
      const index = foundWebsiteInfo.pages.indexOf(req.body.pageName);
      foundWebsiteInfo.pages.splice(index, 1);
      await foundWebsiteInfo.save();
      return res.status(200).json(foundWebsiteInfo);
    }
    return next(fillErrorObject(404, 'Validation error', ['No webpage detail found with the given teamId']));
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Patch client website metadata (title, publication options, layout and/or theme)
 * @param {*} req request object, an array of objects describing the 'field' to change and it's 'value'
 * @param {*} res response object (dictionary of changes made)
 * @returns 200: changes updated in DB
 * @returns 500: Server error while saving to DB
 */
async function updatePublicationOptions(req, res, next) { // eslint-disable-line no-unused-vars
  const updatedPubOptions = req.body;
  const { teamId: _id } = req.params;// TODO: teamId get from the token instead of parameters?
  try {
    await Website.updateOne(
      { teamId: _id },
      {
        $set: {
          publicationOptions: updatedPubOptions,
        },
      },
    );
    return res.status(200).json(updatedPubOptions);
  } catch (err) {
    return res.send(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

async function resetWebPage(req, res, next) { // eslint-disable-line no-unused-vars
  const { teamId } = req.params;

  try {
    const foundWebsite = await Website.findOne({ teamId });
    foundWebsite.pages = [];
    foundWebsite.save();
    return res.status(200).json(foundWebsite);
  } catch (err) {
    return res.send(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

/**
 * Update the HTML <title> tag used for client websites.
 * Currently, we are using the team's name for the title, but this route can be used to update title if need be
 * @param {*} req request object, containing the teamId and website title
 * @param {*} res response object
 * @returns 200: website title successfully updated in the DB
 * @returns 500: Server error while saving website title to DB
 */
async function updateClientWebMetadata(req, res, next) { // eslint-disable-line no-unused-vars
  const data = req.body;
  const { team_id: _id } = req.params;
  const newChanges = {};
  data.forEach((change) => {
    newChanges[change.field] = change.value;
  });

  try {
    await Website.updateOne(
      { teamId: _id },
      {
        $set: newChanges,
      },
    );
    return res.status(200).json(data);
  } catch (err) {
    return res.send(fillErrorObject(500, 'Server error', [err.errors]));
  }
}

module.exports = {
  addWebPage,
  deleteWebPage,
  getWebPageDetails,
  updatePublicationOptions,
  resetWebPage,
  updateClientWebMetadata,
};
