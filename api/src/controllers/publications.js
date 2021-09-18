/**
 * @file This module contains handlers for the "publications" route.
 * @module publications
 */
const mongoose = require('mongoose');
const logger = require('winston');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const { categoryTypes } = require('../config/publication');
const { scrapingConfig } = require('../config/scraping');

const Publication = require('../models/publication.model');
const Team = require('../models/team.model');

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
async function deletePublications(req, res, next) {
  try {
    const publicationIdList = req.body;
    await Publication.deleteMany({ _id: { $in: publicationIdList } });
    return res.status(200).json(publicationIdList);
  } catch (err) {
    return next(fillErrorObject(500, 'Server error', [err.errors]));
  }
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
        return next(
          fillErrorObject(404, 'Validation error', [
            'Publication could not be found',
          ]),
        );
      }
      return res.status(200).json(updatedPublication);
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
  const result = Team.findById({ _id: publication.teamId }).catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
  if (result == null) {
    next(fillErrorObject(404, 'Validation error', ['Team was not found']));
  } else {
    Publication.create(publication)
      .then((createdPublication) => res.status(201).json(createdPublication))
      .catch((err) => next(fillErrorObject(500, 'Server error', [err.errors])));
  }
}

/**
 * Handles a GET request, which will retrieve all publications by team in the endpoint /publications/team/:teamId.
 *
 * @param req request object - team id given in the url
 * @param res response object - a list of publications (see Publications model)
 * @returns 200: a list of publications by the given team id
 * @returns 400: given team id is not in a valid hexadecimal format
 * @returns 404: the specified team or publication was not found
 * @todo filter by other fields like year passed in through req.query
 */
function readAllPublicationsByTeam(req, res, next) {
  const { teamId: _id } = req.params;

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
 * Given a google scholar user id, this function performs a get request to the GScholar profile
 *  to get the raw HTML, and passes it to cheerio to scrape.
 * the publications info from a user's profile.
 * @see config/scraping.js
 * @param req request object - google scholar user id given in the url
 * @param res response object - array of publication objects
 * @returns a list of publications of the given google scholar user id
 */
async function getGoogleScholarPublications(req, res) {
  const author = req.params.gScholarUserId;
  const { startFrom } = req.params;
  const teamId = req.params.teamId;

  const { pageSize } = scrapingConfig;
  const url = scrapingConfig.baseUrl
    + author
    + scrapingConfig.startSuffix
    + startFrom
    + scrapingConfig.pageSizeSuffix
    + pageSize
    + scrapingConfig.sortBySuffix;
  logger.info(`GScholar profile for user id ${author}: ${url}`);
  const publications = [];
  let endOfProfile = false;

  let response = {
    retrieved: publications.length,
    newPublications: [],
    reachedEnd: false,
  };

  const page = await axios.get(url);
  const $ = cheerio.load(page.data);
  const links = [];
  $('.gsc_a_at').each((index, value) => {
    links.push($(value).attr('href'));
  });

  if (links.length === 0) {
    response.reachedEnd = true;
  } else {
    await Promise.all(links.map((x) => scrapeGoogleScholar(x)))
      .then((pub) => publications.push(...pub));

    const newPublications = await validateImportedPublications(
      teamId,
      publications,
    );

    // if the number of publications retrieved is less than the page size,
    // then we've reached the end of the profile
    if (publications.length < pageSize) {
      endOfProfile = true;
    }

    response = {
      retrieved: publications.length,
      newPublications,
      reachedEnd: endOfProfile,
    };
  }

  res.status(200).json(response);
}

/** *
 * The function performs the scraping logic to get the Google Scholar publications
 * and returns it in a format that fits the publication model.
 * @see models/publication.model.js
 * @returns a publication
 */
async function scrapeGoogleScholar(url) {
  logger.info(`Publication url: ${scrapingConfig.gScholarHome + url}`);
  const raw = await axios.get(`${scrapingConfig.gScholarHome + url}`,
    {
      responseType: 'arraybuffer', // to deal with special characters
    });
  const decodedData = iconv.decode(raw.data, 'ISO-8859-1');

  const $ = cheerio.load(decodedData);
  const title = $('#gsc_oci_title').text();
  const link = $('.gsc_oci_title_ggi a').attr('href');
  const values = [];
  const fields = [];
  $('.gsc_oci_value').each((index, value) => {
    values.push($(value).text());
  });
  $('.gsc_oci_field').each((index, value) => {
    fields.push($(value).text());
  });

  const publicationInfo = {};
  fields.forEach((key, i) => {
    publicationInfo[key] = values[i];
  });

  // TODO: this logic depends on the order of the fields,
  // which will differ based on the info of the publication, can be improved
  let type = fields[2];
  let categoryTitle;
  if (!(categoryTypes.includes(type))) {
    type = 'Other';
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
    authors: publicationInfo.Authors.split(', '),
    title,
    link: link || '',
    description: publicationInfo.Description || '',
    yearPublished: (publicationInfo['Publication date'] || '').substr(0, 4), // assuming first 4 chars is year
    citedBy,
    category: {
      type,
      categoryTitle,
      pages: publicationInfo.Pages || '',
      publisher: publicationInfo.Publisher || '',
      volume: publicationInfo.Volume || '',
      issue: publicationInfo.Issue || '',
    },
  };

  return publication;
}

/**
 * Helper function to compare the publications scraped from google scholar with the ones in db,
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

  const foundPublicationTitles = foundPublications.map((pub) => pub.title.toLowerCase());
  const newPublications = [];

  for (let i = 0; i < publications.length; i++) {
    const currentPublication = publications[i];
    const currentPublicationTitle = currentPublication.title.toLowerCase();
    if (!foundPublicationTitles.includes(currentPublicationTitle)) {
      newPublications.push(currentPublication);
    }
  }

  return newPublications;
}

/**
 * Handles a POST request, which will create a bulk publications in the database using the endpoint /publications/import/:teamId.
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
  deletePublications,
  updatePublication,
  createPublication,
  readAllPublicationsByTeam,
  importPublications,
  getGoogleScholarPublications,
};
