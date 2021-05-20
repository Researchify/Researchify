/**
 * @file This module contains handlers for the "publications" route.
 * @module publications
 */
const mongoose = require("mongoose");

const Publication = require("../models/publication.model");

const Team = require("../models/team.model");

const lambda = require('../config/aws/lambda');
const credentials = require('../config/aws/creds');
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");


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

// eslint-disable-next-line no-unused-vars
async function importPublication(req, res) {
    let author = req.params.id;

    const client = new LambdaClient({
        region: 'ap-southeast-2',
        sslEnabled: false,
    });
    const params = {
        FunctionName: 'import-pub',
        InvocationType: 'RequestResponse',
        Payload: "{\"author_id\": \""+ author+"\"}"

        //Payload: "{ \"key1\": \"value1\", \"key2\": \"value2\", \"key3\": \"value3\"}"
        //Payload: "{\"author_id\": \"" + author + "\"}"
    };
    const command = new InvokeCommand(params);
    console.log("a");
    const response = await client.send(command);

    const asciiDecoder = new TextDecoder('utf-8');
    let output = asciiDecoder.decode(response.Payload);
    console.log(output);

    //res.status(200).json(lambda.invoke(params));
    console.log("a");
    let publicationList = JSON.parse(output);
    // eslint-disable-next-line
    /*let publicationList = JSON.parse(`{
    "publications": [
        {
            "container_type": "Publication",
            "bib": {
                "title": "The mathematics of juggling",
                "pub_year": 2006,
                "author": "Burkard Polster",
                "publisher": "Springer Science & Business Media",
                "abstract": "Learn to juggle numbers! This book is the first comprehensive account of the mathematical techniques and results used in the modelling of juggling patterns. This includes all known and many new results about juggling sequences and matrices, the mathematical skeletons of juggling patterns. Many useful and entertaining tips and tricks spice up the mathematical menu presented in this book. There are detailed descriptions of jugglable and attractive juggling sequences, easy zero-gravity juggling, robot juggling, as well as fun juggling of words, anti-balls, and irrational numbers. The book also includes novel, or at least not very well known connections with topics such as bell ringing, knot theory, and the many body problem. In fact, the chapter on mathematical bell ringing has been expanded into the most comprehensive survey in the literature of the mathematics used by bell ringers. Accessible at all levels of mathematical sophistication, this is a book for mathematically wired jugglers, mathematical bell ringers, combinatorists, mathematics educators, and just about anybody interested in beautiful and unusual applications of mathematics."
            },
            "filled": true,
            "author_pub_id": "eRbvWqYAAAAJ:u5HHmVD_uO8C",
            "num_citations": 99,
            "pub_url": "http://books.google.com/books?hl=en&lr=&id=YCARBwAAQBAJ&oi=fnd&pg=PR7&dq=info:-qxGY874hFMJ:scholar.google.com&ots=-hU_2bXHcs&sig=GdbMwkW5-_-Q4ia6N0jZkNx7VPs",
            "cites_id": "6018208567386352890",
            "citedby_url": "/scholar?cites=6018208567386352890",
            "url_related_articles": "/scholar?oi=bibs&hl=en&q=related:-qxGY874hFMJ:scholar.google.com/",
            "cites_per_year": {
                "2005": 4,
                "2006": 5,
                "2007": 3,
                "2008": 6,
                "2009": 5,
                "2010": 7,
                "2011": 6,
                "2012": 5,
                "2013": 6,
                "2014": 6,
                "2015": 4,
                "2016": 5,
                "2017": 9,
                "2018": 5,
                "2019": 10,
                "2020": 7
            },
            "eprint_url": "https://www.jugglingedge.com/pdf/juggling_survey_Burkard_Polster.pdf"
        }
    ]}`)["publications"];*/
    console.log(publicationList);
    let returnList = []
    for(let i =0;i<publicationList.length;i++){
        let currentPub = publicationList[i];
        let pubexport = new Object();
        pubexport["authors"] = [currentPub["bib"]["author"]];
        pubexport["title"] = currentPub["bib"]["title"];
        pubexport["description"] = currentPub["bib"]["abstract"];
        pubexport["year_published"] = currentPub["bib"]["pub_year"];
        pubexport["link"] = currentPub["eprint_url"];
        pubexport["citedBy"] = currentPub["num_citations"];
        returnList.push(pubexport);
        //let pub = await Publication.create(i);
        //console.log(pub);
    }
    res.status(200).json(returnList);

}
module.exports = {deletePublication, updatePublication, createPublication, readPublication, readAllPublicationsByTeam, importPublication};