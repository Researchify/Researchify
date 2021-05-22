/**
 * This module configures and exports an AWS Lambda client used for importing publications.
 */
const { LambdaClient } = require("@aws-sdk/client-lambda");
const credentials = require('./creds');

module.exports = new LambdaClient({
    region: "ap-southeast-2",
    sslEnabled: false,  // todo: check if can be set to true
    credentials
});

