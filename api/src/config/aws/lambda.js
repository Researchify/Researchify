/**
 * This module configures and exports an AWS Lambda client used for importing publications.
 */
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const credentials = require('./creds');


const client = new LambdaClient({
    region: 'us-east-1',
    sslEnabled: false,  // todo: check if can be set to true
    credentials
});


// TODO: Remove the following linesn

/* module.exports = {invoke :async function (params)
{

    const command = new InvokeCommand(params);
    console.log("a");
    // eslint-disable-next-line no-unused-vars
    const response = await client.send(command);
    client.invoke(params, (err, data) => {
        if (err) {
            console.error(err);
            return err;
        } else {
            console.log(data);
            return data;
        }
    });
} */



