/**
 * This module defines endpoints for the "/protected" route and exports its corresponding Router
 */
const protectedRouter = require('express').Router();
 
protectedRouter.get('/', (req, res) => {
    res.json("You are accessing authenticated data");
});
 
module.exports = protectedRouter;