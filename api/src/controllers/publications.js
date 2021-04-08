/**
 * This module contains handlers for the "publications" route.
 */
const mongoose = require("mongoose");

const Publication = require("../models/publication.model");

const Team = require("../models/team.model");

const { body,validationResult } = require('express-validator');

const arrayValidator = arr => Array.isArray(arr);

/**
 * Handles a DELETE request to delete a publication by the mongo object id on the endpoint /publications/:id.
 *
 * @param req request object
 * @param res response object
 * @sends: success message as json
 */
async function deletePublication(req, res) {
    const {id: _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('Error: No publication with that id.');

    await Publication.findByIdAndRemove(_id);
    return res.status(200).json({message: 'Publication deleted successfully.'});
}

/**
 * Handles a PATCH request, which represents updating a specific publication, on the /publications/:id endpoint.
 *
 * @param req request object
 * @param res response object
 * @sends: the newly updated publication
 */
async function updatePublication(req, res) {
    const {id: _id} = req.params;
    const publication = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('Error: No publication with that id.');

    const updatedPublication = await Publication.findByIdAndUpdate(_id, publication, {new: true});
    res.status(200).json(updatedPublication);
}

/**
 * Handles a POST request, which will create a publication in the database using the endpoint /publications.
 * 
 * @param req request object
 * @param res response object
 * @returns 400: the publication given in the request fails some validation
 * @returns 404: no team was found to associate the publication with
 * @returns 201: the publication has been created
 */
async function createPublication(req, res) {
    const publication = req.body;

    // validate input
    // does team id exist?
    if (!mongoose.Types.ObjectId.isValid(publication.teamId)) {
        return res.status(400).send('Error: Given team id is not in a valid hexadecimal format.');
    } else {
        // check if team id exists by doing a find
        var _id = publication.teamId;
        var result = await Team.find({_id});
        if (result.length == 0) {
            return res.status(404).send('Error: Team not found.');
        }
    }

    if (publication.authors.length < 1) {
        return res.status(400).send('Error: Author must not be empty.');
    }

    // there needs to be at least one author
    if (publication.authors.length < 1) {
        return res.status(400).send('Error: There must be at least one author specified.');
    }

    // title needs to be at least 3 chars
    if (publication.title.length < 3) {
        return res.status(400).send('Error: Title needs to be at least 3 characters.');
    }

    // description needs to be at least 5 chars
    if (publication.description.length < 5) {
        return res.status(400).send('Error: Description needs to be at least 5 characters.');
    }

    // summary needs to be at least 5 chars
    if (publication.summary && publication.summary.length < 5) {
        return res.status(400).send('Error: Summary needs to be at least 5 characters.');
    }

    // citedBy needs to be int and >= 0
    if (publication.citedBy && publication.citedBy.isInt() && publication.citedBy >= 0) {
        return res.status(400).send('Error: citedBy needs to be a number and have a value of 0 or greater.');
    }

    // yearPublished needs to be in a YYYY format in string
    publication.yearPublished = new String(publication.yearPublished); // convert to string
    if (publication.yearPublished && publication.yearPublished.length != 4) {
        return res.status(400).send('Error: yearPublished needs to be in a YYYY format.');
    } else {
        publication.yearPublished = new Date(publication.yearPublished);
    }

    // other validations according to schema
    // try {
    //     body('title', 'Error: Title must be at least 3 characters.').trim().isLength({ min: 3 }).escape();
    //     body('description', 'Error: Description must be at least 5 characters.').trim().isLength({ min: 5 }).escape();
    //     body('summary', 'Error: Summary must be at least 5 characters.').trim().isLength({ min: 5 }).escape();
    //     body('citedBy', 'Error: citedBy needs to be a number and have a value of 0 or greater.').isInt({ min: 0 });
    //     body('yearPublished', 'Error: yearPublished needs to be in a YYYY format.').trim().isDate({ format: 'YYYY' });
    // } catch {
        
    // }
    
    // if (!errors.isEmpty()) {
    //     return res.status(404).send(errors);
    // }

    // var newPublication = new Publication(
    //     {
    //         teamId: req.body.teamId,
    //         authors: req.body.authors,
    //         title: req.body.title,
    //         thumnbail: req.body.thumnbail,
    //         link: req.body.link,
    //         description: req.body.description,
    //         summary: req.body.summary,
    //         citedBy: req.body.citedBy,
    //         yearPublished: req.body.yearPublished
    //     }
    // )

    const createdPublication = await Publication.create(publication);
    res.status(201).json(createdPublication);

}

/**
 * Handles a GET request, which will retrieve the specified publication in the database with the given mongo object id in the endpoint /publications/:id
 * 
 * @param req request object
 * @param res response object
 * @returns 400: given publication id is not in a valid hexadecimal format
 * @returns 204: no publications were found
 * @returns 200: the specified publication was found
 */
async function readPublication(req, res) {
    const {id: _id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send('Error: Given publication id is not in a valid hexadecimal format.');
    
    const foundPublication = await Publication.find({_id});

    if (foundPublication.length == 0) { // nothing returned by the query
        res.status(204);  // no content
    } else {
        res.status(200).json(foundPublication[0]);
    }
}

/**
 * Handles a GET request, which will retrieve all publications by team in the endpoint /publications/team/:team_id.
 * 
 * @param req request object
 * @param res response object
 * @returns 400: given team id is not in a valid hexadecimal format
 * @returns 404: the specified team was not found
 * @returns 204: no publications were found
 * @returns 200: a list of publications by the given team id
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

    const foundPublication = await Publication.find({ teamId: _id });

    if (foundPublication.length == 0) { // nothing returned by the query
        res.status(204);  // no content
    } else {
        res.status(200).json(foundPublication);
    }
}

module.exports = {deletePublication, updatePublication, createPublication, readPublication, readAllPublicationsByTeam};