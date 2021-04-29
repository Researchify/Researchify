/**
 * This module contains handlers for the "publications" route.
 */
const mongoose = require("mongoose");

const Publication = require("../models/publication.model");

const Team = require("../models/team.model");


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
 * @param req request object
 * @param res response object
 * @sends: the newly updated publication
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
 * 
 * @param req request object
 * @param res response object
 * @returns 400: the publication given in the request fails some validation also @see validationMiddlewares
 * @returns 404: no team was found to associate the publication with
 * @returns 201: the publication has been created
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
 * @param req request object
 * @param res response object
 * @returns 400: given publication id is not in a valid hexadecimal format
 * @returns 404: no publications were found
 * @returns 200: the specified publication was found
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
 * @param req request object
 * @param res response object
 * @returns 400: given team id is not in a valid hexadecimal format
 * @returns 404: the specified team or publication was not found
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
        res.status(404).send('Error: No publications found.');  // no content
    } else {
        res.status(200).json(foundPublication);
    }
}

module.exports = {deletePublication, updatePublication, createPublication, readPublication, readAllPublicationsByTeam};