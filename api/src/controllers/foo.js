/**
 * This module implements handlers for the "foo" route.
 */

// const mongoose = require('mongoose');
// const FooMessage = require('../models/foo.model');

/**
 * Handles a GET request on the /foo endpoint.
 *
 * @param req request object
 * @param res response object
 * @sends: a list of foos.
 */
function getFoos(req, res) {
    const foos = ['foo1', 'foo2', 'foo3'];
    res.status(200).json(foos);
}

/**
 * Handles a GET request on the /:id endpoint.
 *
 * @param req request object
 * @param res response object
 * @sends: a foo with the id echoed back.
 */
function getFoo(req, res) {
    const {id} = req.params;
    const foo = {message: `foo with id=${id}`};
    res.status(200).json(foo);
}


module.exports = {getFoos, getFoo};