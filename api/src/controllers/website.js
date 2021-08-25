/**
 * This module contains handlers for the "clientWebsite" route.
 * @module website
 */
const Website = require('../models/website.model');

const { fillErrorObject } = require('../middleware/error');

/**
 * Handle GET request from /clientWebsite/:team_id
 * @param {*} req request object, containing teamId
 * @param {*} res response object
 * @returns 200: the team's website info was found
 * @returns 404: team's website info is not found
 * @returns 500: server error
 */
function getWebPageDetails(req, res) {
  Website.findOne({
    teamId: req.params.team_id,
  })
    .then((websiteInfo) => {
      if (!websiteInfo) {
        return res
          .status(404)
          .send(
            'No Website info found for this Team (This is likely because they have not added any website information yet)',
          );
      }
      return res.status(200).send(websiteInfo);
    })
    .catch((error) => res.status(500).json(`Server Error: ${error.message}`));
}

/**
 * Initializes info about the website.
 * @param info: info to initialize schema with, must include teamId
 * @returns 200: Initial website Info successfully added to DB
 * @returns 400: Team Id given already has a website created
 */
function createInitialWebsiteInfo(info) {
  Website.findOne({ teamId: info.teamId })
    .then((website) => {
      if (website == null) {
        // Create Website data
        Website.create(info)
          .then((webData) => webData)
          .catch((err) => {
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
function addWebPage(req, res, next) {
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
          const webData = createInitialWebsiteInfo(webInfo);
          return res.status(200).json(webData);
        } catch (err) {
          next(fillErrorObject(500, 'Server error', [err.errors]));
        }
      } else {
        if (website.pages.includes(req.body.pageName)) {
          // Already includes this page, no work for us to do...
          return res.status(200).json(website);
        }
        website.pages.push(req.body.pageName);

        // update in db
        website
          .save()
          .then((website) => res.status(200).json(website))
          .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
      }
    })
    .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
}

/**
 * Deletes details about a client web-page
 * @param {*} req request object, containing the pageName and teamId
 * @param {*} res response object
 * @returns 200: Web page successfully deleted in the DB
 * @returns 400: Team Id given does not have a website created yet
 * @returns 500: Server error while saving new page name to DB
 */
function deleteWebPage(req, res, next) {
  const { team_id } = req.params;
  Website.findOne({ teamId: team_id })
    .then((website) => {
      if (website == null) {
        res.status(400).send('This team does not have a website created');
      } else {
        const index = website.pages.indexOf(req.body.pageName);
        try {
          website.pages.splice(index, 1);

          // update in db
          website.save();
          console.log(website)
          return res.status(200).json(website);
        } catch (err) {
          next(fillErrorObject(500, 'Server error', [err]));
        }
      }
    })
    .catch((err) => next(fillErrorObject(500, 'Server error', [err])));
}

/**
 * Update publications layout & sorting options
 * @param {*} req request object, containing the teamId and option object
 * @param {*} res response object
 * @returns 200: publication options successfully updated in the DB
 * @returns 500: Server error while saving new page name to DB
 */
async function updatePublicationOptions(req, res, next) { // eslint-disable-line no-unused-vars
  const updatedPubOptions = req.body;
  const { team_id: _id } = req.params;// TODO: teamId get from the token instead of parameters?
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

module.exports = {
  addWebPage,
  deleteWebPage,
  getWebPageDetails,
  updatePublicationOptions,
};
