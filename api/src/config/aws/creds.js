/**
 * This module configures and exports an AWS Credentials object that can be reused.
 */
const {Credentials} = require('aws-sdk');  // todo: optimize import
require('dotenv').config();

module.exports = new Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN | ''
});