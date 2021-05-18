/**
 * This module configures and exports an AWS Lambda client used for importing publications.
 */
const Lambda = require('aws-sdk/clients/lambda');

const credentials = require('./creds');


const client = new Lambda({
    region: 'us-east-1',
    sslEnabled: false,  // todo: check if can be set to true
    credentials
});


// TODO: Remove the following linesn

module.exports = {invoke :function (author)
{
    const params = {
        FunctionName: 'lambda_handler',
        InvocationType: 'RequestResponse',  // todo: can make async using Event invocation type
        Payload: "{\"author\": \"" + author + "\"}"
    };
    client.invoke(params, (err, data) => {
        if (err) {
            console.error(err);
            return err;
        } else {
            console.log(data);
            return data;
        }
    });
}
}
 invoke();


