/**
 * This module contains handlers for the "publications" route.
 */
const mongoose = require("mongoose");
const axios = require('axios');

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

// eslint-disable-next-line no-unused-vars
/**
 * Handles a GET request, which represents importing a pub from google scholar
 *
 * @param req request object
 * @param res response object
 * @sends: the imported publication
 */
async function importPublications(req, res){
    const {id} = req.params;


    // set up the request parameters
    let query = {
      api_key: process.env.API_SCHOLAR,// use your own api key
      q: id,
      search_type: "scholar",
        num: 10
    };

    // make the http GET request to Scale SERP
    axios.get('https://api.scaleserp.com/search', { query })
      .then(response => {

        let results = response.data["scholar_results"];
        res.status(200).json(results);

      }).catch(error => {
        // catch and print the error
        console.log(error);
      })
}

module.exports = {deletePublication, updatePublication, importPublications};

