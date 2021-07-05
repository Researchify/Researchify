/**
 * @file This module contains handlers for the "publications" route.
 * @module publications
 */
const mongoose = require("mongoose");

const Publication = require("../models/publication.model");

const Team = require("../models/team.model");

const { Cluster } = require('puppeteer-cluster');

const { puppeteerConfig, categoryType } = require("../config/puppeteer");



/**
 * Handles a DELETE request to delete a publication by the mongo object id on the endpoint /publications/:id.
 *
 * @param req request object - the publication id given in the url
 * @param res response object
 * @returns 200: publication deleted successfully
 * @returns 404: publication not found
 * @returns 400: error deleting publication
 */
async function deletePublication(req, res) {
    const {id: _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('Error: No publication with that id.');

    try {
        await Publication.findByIdAndRemove(_id);
        return res.status(200).json({message: 'Publication deleted successfully.'});
    } catch (err) {
        res.status(400).json(`Error: ${err.message}`);
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
async function updatePublication(req, res) {
    const {id: _id} = req.params;
    const publication = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('Error: No publication with that id.');

    try {
        const updatedPublication = await Publication.findByIdAndUpdate(_id, publication, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedPublication);
    } catch (err) {
        res.status(422).json(`Error: ${err.message}`);
    }
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
async function createPublication(req, res) {
    const publication = req.body;

    if (!mongoose.Types.ObjectId.isValid(publication.teamId)) {
        return res.status(400).send('Error: Given team id is not in a valid hexadecimal format.');
    } else {
        var result = await Team.findById({ _id: publication.teamId});
        if (result == null) {
            return res.status(404).send('Error: Team not found.');
        }
    }

    const createdPublication = await Publication.create(publication);
    res.status(201).json(createdPublication);

}

/**
 * Handles a GET request, which will retrieve the specified publication in the database with the given mongo object id in the endpoint /publications/:id
 * 
 * @param req request object - including the publication id given in the url
 * @param res response object - publication (see Publications model)
 * @returns 200: the specified publication was found
 * @returns 400: given publication id is not in a valid hexadecimal format
 * @returns 404: no publications were found
 */
async function readPublication(req, res) {
    const {id: _id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send('Error: Given publication id is not in a valid hexadecimal format.');
    
    const foundPublication = await Publication.findById(_id);

    if (foundPublication == null) { // nothing returned by the query
        res.status(404).send('Error: No publication found.');  // no content
    } else {
        res.status(200).json(foundPublication);
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
async function readAllPublicationsByTeam(req, res) {
    const {team_id: _id} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send('Error: Given team id is not in a valid hexadecimal format.');
    } else {
        var result = await Team.find({_id});
        if (result.length == 0) {
            return res.status(404).send('Error: Team not found.');
        }
    }

    const foundPublication = await Publication.aggregate([
        {
            $match: { teamId: mongoose.Types.ObjectId(_id) }
        },
        {
            $addFields: { year: { $year: "$yearPublished" } }
        },
        {
            $sort: { year: -1, title: 1 }
        }
    ]);
    res.status(200).json(foundPublication);
}

/**
 * Given a google scholar user id, this function uses a headless browser via Puppeteer to scrape
 * the publications info from a user's profile. This runs several threads in parallel specified in the config.
 * Endpoint: /publications/import/:id
 * @see config/puppeteerConfig.js
 * @param req request object - google scholar user id given in the url
 * @param res response object - array of publication objects
 * @returns a list of publications of the given google scholar user id
 */
async function getGoogleScholarPublications(req, res) {
    const author = req.params.gScholarUserId;
    const startFrom = req.params.startFrom;

    const noOfDummyLinks = puppeteerConfig.noOfDummyLinks;
    const noOfThreads = puppeteerConfig.noOfThreads;
    const pageSize = puppeteerConfig.pageSize;
    const url = puppeteerConfig.baseUrl + author + puppeteerConfig.startSuffix
        + startFrom + puppeteerConfig.pageSizeSuffix + pageSize;
    console.log(url);
    const publications = [];

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: noOfThreads,
    });

    await cluster.task(async ({ page, data: data }) => {
        const url = data["url"];
        const index = data["index"];
        await page.goto(url);
        // console.log(index);
        const resultLinks = await page.$$('.gsc_a_t a');

        await Promise.all([
            resultLinks[index].click(),
            page.waitForSelector("div.gsc_vcd_field")
        ]);

        let title;

        try {
            // this html tag is for if the title of the publication is a link
            title = await page.$eval("a.gsc_vcd_title_link", (titles) => titles.map((title) => title.innerText));

        } catch (e) {
            // an error will be caught if its not a link, and try a diff html tag for title
            title = await page.$$eval("#gsc_vcd_title", (titles) => titles.map((title) => title.innerText));
        }
        // console.log(title[0]);

        // pdf link
        const link = await page.$$eval("div.gsc_vcd_title_ggi a", (links) => links.map((link) => link.href));

        // this gives authors, pub date, journal/conf/book name, pages, description, cited by and other stuff
        const values = await page.$$eval("div.gsc_vcd_value", (titles) => titles.map((title) => title.innerText));

        // get fields
        const fields = await page.$$eval("div.gsc_vcd_field", (titles) => titles.map((title) => title.innerText));

        // collating the fields with the values
        const publicationInfo = {};
        fields.forEach((key, i) => publicationInfo[key] = values[i]);

        let type = fields[2].toUpperCase();
        let categoryTitle;
        if (!(type in categoryType)) {
          type = "OTHER";
          categoryTitle = "OTHER";
        } else {
          categoryTitle = values[2];
        }

        let citedBy;
        if (publicationInfo["Total citations"] === undefined) {
          citedBy = "";
        } else {
          citedBy = publicationInfo["Total citations"]
            .split("\n", 1)[0]
            .split(" ")[2];
        }

        const publication = {
            "authors": publicationInfo["Authors"].split(", "),
            "title": title[0],
            "link": link[0] || '',
            "description": publicationInfo["Description"] || '',
            "citedBy": citedBy,
            "yearPublished": (publicationInfo["Publication date"] || '').substr(0,4),  // assuming first 4 chars is year
            "category": {
                "type": type,
                "categoryTitle": categoryTitle,
                "pages": publicationInfo["Pages"] || '',
                "publisher": publicationInfo["Publisher"] || '',
                "volume": publicationInfo["Volume"] || '',
                "issue": publicationInfo["Issue"] ||''
            }
        }

        publications.push(publication);

    });

    console.time('doSomething');

    for (let i = noOfDummyLinks; i < pageSize+noOfDummyLinks; i++) {
        await cluster.queue({ "url": url, "index": i})
    }

    await cluster.idle();
    await cluster.close();

    console.timeEnd('doSomething');

    res.status(200).json(publications);

}

async function validateImportedPublications(req, res) {
    
}

/**
 * Handles a POST request, which will create a bluk publications in the database using the endpoint /publications/import/:team_id.
 * @param req request object - team id given in the url, an array of publication in body (see Publication model)
 * @param res response object
 * @returns 201: the bulk publications has been created
 * @returns 400: given team id is not in a valid hexadecimal format (validate via team middleware)
 * @returns 404: no team was found to associate the publication with (validate via team middleware)
 */
async function importPublications(req, res) {
    const importedPublications = await Publication.insertMany(req.body);
    res.status(201).json(importedPublications);
}

module.exports = {deletePublication, updatePublication, createPublication, readPublication, 
    readAllPublicationsByTeam, importPublications, getGoogleScholarPublications};
