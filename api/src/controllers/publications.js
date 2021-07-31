/**
 * @file This module contains handlers for the "publications" route.
 * @module publications
 */
const mongoose = require('mongoose');

const Publication = require('../models/publication.model');

const Team = require('../models/team.model');

const { firefox } = require('playwright');

const { playwrightConfig, categoryType } = require('../config/playwright');

const { fillErrorObject } = require('../middleware/error');

/**
 * Handles a DELETE request to delete a publication by the mongo object id on the endpoint /publications/:id.
 *
 * @param req request object - the publication id given in the url
 * @param res response object
 * @returns 200: publication deleted successfully
 * @returns 404: publication not found
 * @returns 400: error deleting publication
 */
function deletePublication(req, res, next) {
  const { id: _id } = req.params;
  Publication.findByIdAndRemove(_id)
    .then((foundPublication) => {
      if (foundPublication === null) {
        next(
          fillErrorObject(400, 'Validation error', [
            'Publication could not be found',
          ])
        );
      } else {
        return res
          .status(200)
          .json({ message: 'Publication deleted successfully.' });
      }
    })
    .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
}

/**
 * Handles a PATCH request, which represents updating a specific publication, on the /publications/:id endpoint.
 *
 * @param req request object - the publication id given in the url, publication in body (see Publication model)
 * @param res response object - updated publication
 * @returns 200: the newly updated publication
 * @returns 404: publication not found
 * @returns 422: error in the request object, unable to update publication
 */
function updatePublication(req, res, next) {
  const { id: _id } = req.params;
  const publication = req.body;

  Publication.findByIdAndUpdate(_id, publication, {
    new: true,
    runValidators: true,
  })
    .then((updatedPublication) => {
      if (updatedPublication == null) {
        // nothing returned by the query
        next(
          fillErrorObject(404, 'Validation error', [
            'Publication could not be found',
          ])
        );
      } else {
        return res.status(200).json(updatedPublication);
      }
    })
    .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
}

/**
 * Handles a POST request, which will create a publication in the database using the endpoint /publications.
 * <br />Validation rules:
 * <br />- at least one author,
 * <br />- title needs to be at least 3 characters,
 * <br />- description needs to be at least 5 characters,
 * <br />- summary needs to be at least 5 characters,
 * <br />- citedBy needs to be an integer value of 0 or greater
 *
 * @param req request object - publication in body (see Publication model)
 * @param res response object
 * @returns 201: the publication has been created
 * @returns 400: the publication given in the request fails some validation also @see validationMiddlewares
 * @returns 404: no team was found to associate the publication with
 */
function createPublication(req, res, next) {
  const publication = req.body;
  const result = Team.findById({ _id: publication.teamId }).catch((err) =>
    next(fillErrorObject(500, 'Server error', [err.errors]))
  );
  if (result == null) {
    next(fillErrorObject(404, 'Validation error', ['Team was not found']));
  } else {
    Publication.create(publication)
      .then((createdPublication) => res.status(201).json(createdPublication))
      .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
  }
}

/**
 * Handles a GET request, which will retrieve all publications by team in the endpoint /publications/team/:team_id.
 *
 * @param req request object - team id given in the url
 * @param res response object - a list of publications (see Publications model)
 * @returns 200: a list of publications by the given team id
 * @returns 400: given team id is not in a valid hexadecimal format
 * @returns 404: the specified team or publication was not found
 * @todo filter by other fields like year passed in through req.query
 */
function readAllPublicationsByTeam(req, res, next) {
  const { team_id: _id } = req.params;

  Publication.aggregate([
    {
      $match: { teamId: mongoose.Types.ObjectId(_id) },
    },
    {
      $addFields: { year: { $year: '$yearPublished' } },
    },
    {
      $sort: { year: -1, title: 1 },
    },
  ])
    .then((foundPublication) => res.status(200).json(foundPublication))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
}

/**
 * Given a google scholar user id, this function uses a headless browser via Puppeteer to scrape
 * the publications info from a user's profile. This runs several threads in parallel specified in the config.
 * @see config/playwright.js
 * @param req request object - google scholar user id given in the url
 * @param res response object - array of publication objects
 * @returns a list of publications of the given google scholar user id
 */
async function getGoogleScholarPublications(req, res) {
  const author = req.params.gScholarUserId;
  const startFrom = req.params.startFrom;
  const teamId = req.params.team_id;

  const noOfDummyLinks = playwrightConfig.noOfDummyLinks;
  const pageSize = playwrightConfig.pageSize;
  const url =
    playwrightConfig.baseUrl +
    author +
    playwrightConfig.startSuffix +
    startFrom +
    playwrightConfig.pageSizeSuffix +
    pageSize +
    playwrightConfig.sortBySuffix;
  console.log(url);
  let publications = [];

  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  console.time('timeToScrape');
  await page.goto(url);

  const resultLinks = await page.$$('.gsc_a_t a');
  let links = [];

  for (let i = noOfDummyLinks; i < resultLinks.length; i++) {
    links.push(await resultLinks[i].getAttribute('href'));
  }

  await browser.close();

  await Promise.all(links.map((x) => scrapeGoogleScholar(x))).then((pub) =>
    publications.push(...pub)
  );

  console.timeEnd('timeToScrape');
  console.log(publications);

  const newPublications = await validateImportedPublications(
    teamId,
    publications
  );

  const response = {
    retrieved: publications.length,
    newPublications: newPublications,
  };

  res.status(200).json(response);
}

async function scrapeGoogleScholar(url) {
  console.log(playwrightConfig.gScholarHome + url);
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(playwrightConfig.gScholarHome + url);

  let title;

  try {
    // this html tag is for if the title of the publication is a link
    title = await page.$$eval('a.gsc_oci_title_link', (titles) =>
      titles.map((title) => title.innerText)
    );
  } catch (e) {
    // an error will be caught if its not a link, and try a diff html tag for title
    console.log('default title not found');
  }

  const link = await page.$$eval('div.gsc_oci_title_ggi a', (links) =>
    links.map((link) => link.href)
  );
  const values = await page.$$eval('div.gsc_oci_value', (titles) =>
    titles.map((title) => title.innerText)
  );
  const fields = await page.$$eval('div.gsc_oci_field', (titles) =>
    titles.map((title) => title.innerText)
  );

  await browser.close();

  const publicationInfo = {};
  fields.forEach((key, i) => (publicationInfo[key] = values[i]));

  // TODO: this logic depends on the order of the fields, 
  // which will differ based on the info of the publication, can be improved
  let type = fields[2].toUpperCase();
  let categoryTitle;
  if (!(type in categoryType)) {
    type = 'OTHER';
    categoryTitle = '';
  } else {
    categoryTitle = values[2];
  }

  let citedBy;
  if (publicationInfo['Total citations'] === undefined) {
    citedBy = '';
  } else {
    citedBy = publicationInfo['Total citations']
      .split('\n', 1)[0]
      .split(' ')[2];
  }

  const publication = {
    authors: publicationInfo['Authors'].split(', '),
    title: title[0],
    link: link[0] || '',
    description: publicationInfo['Description'] || '',
    yearPublished: (publicationInfo['Publication date'] || '').substr(0, 4), // assuming first 4 chars is year
    citedBy: citedBy,
    category: {
      type: type,
      categoryTitle: categoryTitle,
      pages: publicationInfo['Pages'] || '',
      publisher: publicationInfo['Publisher'] || '',
      volume: publicationInfo['Volume'] || '',
      issue: publicationInfo['Issue'] || '',
    },
  };

  return publication;
}

/**
 * scrapeGoogleScholar function to compare the publications scraped from google scholar with the ones in db,
 * and return the publications not already in the db.
 * @param _id teamId
 * @param publications list of publications scraped from google scholar
 * @returns the list of publications that are not already in the db and can be added
 */
async function validateImportedPublications(_id, publications) {
  const foundPublications = await Publication.aggregate([
    {
      $match: { teamId: mongoose.Types.ObjectId(_id) },
    },
    {
      $addFields: { year: { $year: '$yearPublished' } },
    },
    {
      $sort: { year: -1, title: 1 },
    },
  ]);

  const foundPublicationTitles = foundPublications.map((pub) =>
    pub.title.toLowerCase()
  );
  let newPublications = [];

  for (let i = 0; i < publications.length; i++) {
    const currentPublication = publications[i];
    const currentPublicationTitle = currentPublication.title.toLowerCase();
    if (!foundPublicationTitles.includes(currentPublicationTitle)) {
      newPublications.push(currentPublication);
      //   console.log("Added " + currentPublicationTitle);
    }
  }

  return newPublications;
}

/**
 * Handles a POST request, which will create a bulk publications in the database using the endpoint /publications/import/:team_id.
 * @param req request object - team id given in the url, an array of publication in body (see Publication model)
 * @param res response object
 * @returns 201: the bulk publications has been created
 * @returns 400: given team id is not in a valid hexadecimal format (validate via team middleware)
 * @returns 404: no team was found to associate the publication with (validate via team middleware)
 */
function importPublications(req, res, next) {
  Publication.insertMany(req.body)
    .then((importedPublications) => res.status(201).json(importedPublications))
    .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
}

module.exports = {
  deletePublication,
  updatePublication,
  createPublication,
  readAllPublicationsByTeam,
  importPublications,
  getGoogleScholarPublications,
};
