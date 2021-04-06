/**
 * This module contains handlers for the "publications" route.
 */
const mongoose = require("mongoose");

const Publication = require("../models/publication.model");


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


module.exports = {deletePublication, updatePublication};