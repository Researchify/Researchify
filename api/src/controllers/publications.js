/**
 * @file This module contains handlers for the "publications" route.
 * @module publications
 */
const mongoose = require("mongoose");

const Publication = require("../models/publication.model");

const Team = require("../models/team.model");

const lambda = require('../config/aws/lambda');

const { InvokeCommand } = require("@aws-sdk/client-lambda");


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
 */
async function importPublication(req, res) {
    let author = req.params.id;
    console.log(author);

    const client = lambda;
    const params = {
        FunctionName: 'import-pub-opt',
        InvocationType: 'RequestResponse',
        Payload: "{\"author_id\": \""+ author+"\"}"
    };
    const command = new InvokeCommand(params);
    const response = await client.send(command);

    const asciiDecoder = new TextDecoder('utf-8');
    const output = asciiDecoder.decode(response.Payload);

    const lambdaResult = JSON.parse(JSON.parse(output));
    // uncomment the lines below for testing if the lambda doesn't respond
    // comment out lines 168-180 to get rid of the lambda call
    // const lambdaResult = {
    //     "publications": [
    //         {
    //             "container_type": "Publication",
    //             "bib": {
    //                 "title": "The mathematics of juggling",
    //                 "pub_year": 2006,
    //                 "author": "Burkard Polster",
    //                 "publisher": "Springer Science & Business Media",
    //                 "abstract": "Learn to juggle numbers! This book is the first comprehensive account of the mathematical techniques and results used in the modelling of juggling patterns. This includes all known and many new results about juggling sequences and matrices, the mathematical skeletons of juggling patterns. Many useful and entertaining tips and tricks spice up the mathematical menu presented in this book. There are detailed descriptions of jugglable and attractive juggling sequences, easy zero-gravity juggling, robot juggling, as well as fun juggling of words, anti-balls, and irrational numbers. The book also includes novel, or at least not very well known connections with topics such as bell ringing, knot theory, and the many body problem. In fact, the chapter on mathematical bell ringing has been expanded into the most comprehensive survey in the literature of the mathematics used by bell ringers. Accessible at all levels of mathematical sophistication, this is a book for mathematically wired jugglers, mathematical bell ringers, combinatorists, mathematics educators, and just about anybody interested in beautiful and unusual applications of mathematics."
    //             },
    //             "filled": true,
    //             "author_pub_id": "eRbvWqYAAAAJ:u5HHmVD_uO8C",
    //             "num_citations": 99,
    //             "pub_url": "http://books.google.com/books?hl=en&lr=&id=YCARBwAAQBAJ&oi=fnd&pg=PR7&dq=info:-qxGY874hFMJ:scholar.google.com&ots=-hU_2bXHcs&sig=GdbMwkW5-_-Q4ia6N0jZkNx7VPs",
    //             "cites_id": "6018208567386352890",
    //             "citedby_url": "/scholar?cites=6018208567386352890",
    //             "url_related_articles": "/scholar?oi=bibs&hl=en&q=related:-qxGY874hFMJ:scholar.google.com/",
    //             "cites_per_year": {
    //                 "2005": 4,
    //                 "2006": 5,
    //                 "2007": 3,
    //                 "2008": 6,
    //                 "2009": 5,
    //                 "2010": 7,
    //                 "2011": 6,
    //                 "2012": 5,
    //                 "2013": 6,
    //                 "2014": 6,
    //                 "2015": 4,
    //                 "2016": 5,
    //                 "2017": 9,
    //                 "2018": 5,
    //                 "2019": 10,
    //                 "2020": 7
    //             },
    //             "eprint_url": "https://www.jugglingedge.com/pdf/juggling_survey_Burkard_Polster.pdf"
    //         },
    //         {
    //             "container_type": "Publication",
    //             "bib": {
    //                 "title": "A geometrical picture book",
    //                 "pub_year": 2012,
    //                 "author": "Burkard Polster",
    //                 "publisher": "Springer Science & Business Media",
    //                 "abstract": "How do you convey to your students, colleagues and friends some of the beauty of the kind of mathematics you are obsessed with? If you are a mathematician interested in finite or topological geometry and combinatorial designs, you could start by showing them some of the (400+) pictures in the\" picture book\". Pictures are what this book is all about; original pictures of everybody's favorite geometries such as configurations, projective planes and spaces, circle planes, generalized polygons, mathematical biplanes and other designs which capture much of the beauty, construction principles, particularities, substructures and interconnections of these geometries. The level of the text is suitable for advanced undergraduates and graduate students. Even if you are a mathematician who just wants some interesting reading you will enjoy the author's very original and comprehensive guided tour of small finite geometries and geometries on surfaces This guided tour includes lots of sterograms of the spatial models, games and puzzles and instructions on how to construct your own pictures and build some of the spatial models yourself."
    //             },
    //             "filled": true,
    //             "author_pub_id": "eRbvWqYAAAAJ:u-x6o8ySG0sC",
    //             "num_citations": 74,
    //             "pub_url": "http://books.google.com/books?hl=en&lr=&id=tHzTBwAAQBAJ&oi=fnd&pg=PA3&dq=info:Zq_2oTnSPr4J:scholar.google.com&ots=QIXy6RJ_Kf&sig=vnB_ABuFiSs_K4GYpEIKuAbs7Uc",
    //             "cites_id": "13708625460734635878",
    //             "citedby_url": "/scholar?cites=13708625460734635878",
    //             "url_related_articles": "/scholar?oi=bibs&hl=en&q=related:Zq_2oTnSPr4J:scholar.google.com/",
    //             "cites_per_year": {
    //                 "1999": 2,
    //                 "2000": 2,
    //                 "2001": 2,
    //                 "2002": 3,
    //                 "2003": 1,
    //                 "2004": 1,
    //                 "2005": 0,
    //                 "2006": 5,
    //                 "2007": 4,
    //                 "2008": 4,
    //                 "2009": 6,
    //                 "2010": 3,
    //                 "2011": 4,
    //                 "2012": 6,
    //                 "2013": 5,
    //                 "2014": 5,
    //                 "2015": 5,
    //                 "2016": 1,
    //                 "2017": 5,
    //                 "2018": 2,
    //                 "2019": 5,
    //                 "2020": 1
    //             }
    //         }]};
    const retrievedPublications = lambdaResult.publications;

    var publicationsList = []
    for(let i =0;i<retrievedPublications.length;i++){
        var currentPub = retrievedPublications[i];
        var categoryType;
        var categoryTitle, volume, issue, pages = "";
        if (currentPub["bib"].hasOwnProperty("journal")) {
            categoryType = "JOURNAL";
            categoryTitle = currentPub["bib"]["journal"];
            pages = currentPub["bib"]["pages"];
            volume = currentPub["bib"]["volume"];
            issue = currentPub["bib"]["issue"];
        } else if (currentPub["bib"].hasOwnProperty("conference")) {
            categoryType = "CONFERENCE";
            categoryTitle = currentPub["bib"]["conference"];
            pages = currentPub["bib"]["pages"];
            volume = currentPub["bib"]["volume"];
        } else { // TODO: to handle book as a separate category in the future
            categoryType = "OTHER";
            pages = currentPub["bib"]["pages"];
            // categoryTitle = currentPub["bib"]["book"];
        }
        var publication = {
            "authors": [currentPub["bib"]["author"]],
            "title": currentPub["bib"]["title"],
            "description": currentPub["bib"]["abstract"],
            "yearPublished": currentPub["bib"]["pub_year"],
            "link": currentPub["eprint_url"],
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

module.exports = {deletePublication, updatePublication, createPublication, readPublication, readAllPublicationsByTeam, importPublication};