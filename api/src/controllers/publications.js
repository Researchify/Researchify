/**
 * @file This module contains handlers for the "publications" route.
 * @module publications
 */
const mongoose = require("mongoose");

const Publication = require("../models/publication.model");

const Team = require("../models/team.model");

// const lambda = require('../config/aws/lambda');

// const { InvokeCommand } = require("@aws-sdk/client-lambda");

// const { gScholarLambdaParams } = require("../config/constants");


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
 * Given a google scholar user id, this function calls an AWS Lambda Python function that scrapes the publications off the user's profile and returns them.
 * Some extra processing is done by this function to make the publications returned fit the publication model of the DB.
 * Endpoint: /publications/import/:id
 * @param req request object - google scholar user id given in the url
 * @param res response object - array of publication objects
 * @returns a list of publications of the given google scholar user id
 */
async function getGoogleScholarPublications(req, res) {
    // const author = req.params.id;

    // const client = lambda;
    // const params = gScholarLambdaParams;
    // params["Payload"] = "{\"author_id\": \""+ author+"\"}"
    
    // const command = new InvokeCommand(params);
    // const response = await client.send(command);

    // const asciiDecoder = new TextDecoder('utf-8');
    // const output = asciiDecoder.decode(response.Payload);

    // const lambdaResult = JSON.parse(JSON.parse(output));
    // uncomment the lines below for testing if the lambda doesn't respond
    // comment out lines 168-180 to get rid of the lambda call
    const lambdaResult = {
        "publications": [
            {
                "container_type": "Publication",
                "bib": {
                    "title": "Deepgauge: Multi-granularity testing criteria for deep learning systems",
                    "pub_year": 2018,
                    "author": "Lei Ma, Felix Juefei-Xu, Fuyuan Zhang, Jiyuan Sun, Minhui Xue, Bo Li, Chunyang Chen, Ting Su, Li Li, Yang Liu, Jianjun Zhao, Yadong Wang",
                    "book": "Proceedings of the 33rd ACM/IEEE International Conference on Automated Software Engineering",
                    "abstract": "Deep learning (DL) defines a new data-driven programming paradigm that constructs the internal system logic of a crafted neuron network through a set of training data. We have seen wide adoption of DL in many safety-critical scenarios. However, a plethora of studies have shown that the state-of-the-art DL systems suffer from various vulnerabilities which can lead to severe consequences when applied to real-world applications. Currently, the testing adequacy of a DL system is usually measured by the accuracy of test data. Considering the limitation of accessible high quality test data, good accuracy performance on test data can hardly provide confidence to the testing adequacy and generality of DL systems. Unlike traditional software systems that have clear and controllable logic and functionality, the lack of interpretability in a DL system makes system analysis and defect detection difficult, which could …",
                    "pages": "120-131"
                },
                "num_citations": 99,
                "eprint_url": "https://arxiv.org/pdf/1803.07519"
            },
            {
                "container_type": "Publication",
                "bib": {
                    "title": "Techland: Assisting technology landscape inquiries with insights from stack overflow",
                    "pub_year": 2016,
                    "author": "Chunyang Chen, Zhenchang Xing, Lei Han",
                    "conference": "IEEE International Conference on Software Maintenance and Evolution",
                    "pages": "356-366",
                    "publisher": "IEEE",
                    "abstract": "Understanding the technology landscape is crucial for the success of the software-engineering project or organization. However, it can be difficult, even for experienced developers, due to the proliferation of similar technologies, the complex and often implicit dependencies among technologies, and the rapid development in which technology landscape evolves. Developers currently rely on online documents such as tutorials and blogs to find out best available technologies, technology correlations, and technology trends. Although helpful, online documents often lack objective, consistent summary of the technology landscape. In this paper, we present the TechLand system for assisting technology landscape inquiries with categorical, relational and trending knowledge of technologies that is aggregated from millions of Stack Overflow questions mentioning the relevant technologies. We implement the TechLand …"
                },
                "num_citations": 28
            }]};
    const retrievedPublications = lambdaResult.publications;

    const publicationsList = []
    for (let i =0; i<retrievedPublications.length; i++) {
        const currentPub = retrievedPublications[i];
        let categoryType, categoryTitle, volume, issue, pages = "";
        if ("journal" in currentPub["bib"]) {
            categoryType = "JOURNAL";
            categoryTitle = currentPub["bib"]["journal"];
        } else if ("conference" in currentPub["bib"]) {
            categoryType = "CONFERENCE";
            categoryTitle = currentPub["bib"]["conference"];
        } else { // TODO: to handle book as a separate category in the future
            categoryType = "OTHER";
            // categoryTitle = currentPub["bib"]["book"];
        }
        pages = currentPub["bib"]["pages"];
        volume = currentPub["bib"]["volume"];
        issue = currentPub["bib"]["issue"];

        const publication = {
            "authors": [currentPub["bib"]["author"]],
            "title": currentPub["bib"]["title"],
            "description": currentPub["bib"]["abstract"],
            "yearPublished": currentPub["bib"]["pub_year"],
            "link": currentPub["eprint_url"], // TODO: compare with pub_url
            "citedBy": currentPub["num_citations"],
            "category": {
                "type": categoryType,
                "categoryTitle": categoryTitle,
                "publisher": currentPub["bib"]["publisher"],
                "volume": volume,
                "issue": issue,
                "pages": pages
            }
        }
        publicationsList.push(publication);
    }
    res.status(200).json(publicationsList);

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
