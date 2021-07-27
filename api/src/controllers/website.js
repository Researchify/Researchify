/**
 * This module contains handlers for the "clientWebsite" route.
 * @module website
 */
const axios = require('axios');

const Website = require('../models/website.model');

const { fillErrorObject } = require('../middleware/error');

var ObjectId = require('mongoose').Types.ObjectId;

/**
 * Handle GET request from /clientWebsite/:team_id
 * @param {*} req request object, containing teamId
 * @param {*} res response object
 * @returns 200: the team's website info was found
 * @returns 404: team's website info is not found
 * @returns 500: server error
 */
async function getWebPageDetails(req, res) {
  try {
    const websiteInfo = await Website.findOne({
      teamId: new ObjectId(req.params.team_id),
    });
    if (!websiteInfo) {
      return res
        .status(404)
        .send(
          'No Website info found for this Team (This is likely because they have not added any website information yet)'
        );
    }
    return res.status(200).send(websiteInfo);
  } catch (error) {
    return res.status(500).json(`Server Error: ${error.message}`);
  }
}

/**
 * Initializes info about the website.
 * @param info: info to initialize schema with, must include teamId
 * @returns 200: Initial website Info successfully added to DB
 * @returns 400: Team Id given already has a website created
 */
async function createInitialWebsiteInfo(info) {
  Website.findOne({ teamId: info.teamId })
    .then((website) => {
      if (website == null) {
        // Create Website data
        Website.create(info).catch((err) => {
          throw err;
        });
      }
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * Adds details about a new page created in the website
 * @param {*} req request object, containing the pageName and teamId
 * @param {*} res response object
 * @returns 200: Web page successfully added to DB
 * @returns 400: Team Id given does not have a website created yet
 * @returns 500: Server error while saving new page name to DB
 */
async function addWebPage(req, res, next) {
  const { team_id } = req.params;

  Website.findOne({ teamId: team_id })
    .then((website) => {
      if (website == null) {
        // Create Website schema
        const webInfo = {
          teamId: team_id,
          pages: [req.body.pageName],
        };
        try {
          createInitialWebsiteInfo(webInfo);
        } catch (err) {
          next(fillErrorObject(500, 'Server error', [err.errors]));
        }
      } else {
        website.pages.push(req.body.pageName);

        try {
          // update in db
          website.save();
          return res.status(200).json(website);
        } catch (err) {
          return res.status(500).send(`Error: ${err.message}`);
        }
      }
    })
    .catch((err) => res.status(500).json('Server Error: ' + err));
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
  const { team_id } = req.params;
  Website.findOne({ teamId: team_id })
    .then((website) => {
      if (website == null) {
        res.status(400).send('This team does not have a website created');
      } else {

        index = website.pages.indexOf(req.body.pageName);
        try {
          website.pages.splice(index, 1);
          
          // update in db
          website.save();
          return res.status(200).json(website);
        } catch (err) {
          next(fillErrorObject(500, 'Server error', [err]));
        }
      }
    })
    .catch((err) => next(fillErrorObject(500, 'Server error', [err])));
}

module.exports = {
  addWebPage,
  deleteWebPage,
  getWebPageDetails,
};