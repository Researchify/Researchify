/**
 * This module configures and exports an AWS Credentials object that can be reused.
 */
const {defaultProvider} = require('@aws-sdk/credential-provider-node');

// reads from env file for AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN (if given)
const credentials = defaultProvider();
module.exports = credentials;