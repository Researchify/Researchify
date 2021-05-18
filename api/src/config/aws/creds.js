/**
 * This module configures and exports an AWS Credentials object that can be reused.
 */
const {Credentials} = require('aws-sdk');  // todo: optimize import
require('dotenv').config();

module.exports = new Credentials({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
    sessionToken: process.env.aws_session_token | ''
});