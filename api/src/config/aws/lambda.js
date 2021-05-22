/**
 * This module configures and exports an AWS Lambda client used for importing publications.
 */
const { LambdaClient } = require("@aws-sdk/client-lambda");
require('dotenv').config();
const credentials = require('./creds');

module.exports = new LambdaClient({
    region: process.env.AWS_REGION,
    sslEnabled: false,  // todo: check if can be set to true
    credentials
});;

