/**
 * This module contains handlers for the "twitter" route.
 */
 const { TwitterApi } = require('twitter-api-v2');

// var twitterClient = new TwitterApi({
//     appKey: process.env.TWITTER_API_KEY,
//     appSecret: process.env.TWITTER_API_SECRET,
//     bearerToken: process.env.TWITTER_BEARER_TOKEN
//   });

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

const roClient = twitterClient.readOnly;

async function getTweetsByHandle(req, res) {
    const {id: _id} = req.params; // twitter handle
    console.log(_id);
    
    // get user id
    const usernameResp = await twitterClient.v2.get("users/by/username/" + _id, function(error, response) {
        if (error) {
            res.status(404).json("Error: Twitter user not found.");
        }
        console.log(response);
        res.status(200).json(response);
    });
    // const userId = usernameResp.data.id;
    
    // // get tweets
    // const tweets = await twitterClient.get("/2/users/" + userId + "/tweets", function(error, response) {
    //     if (error) {
    //         res.status(500).json("Error: There was an error trying to retrieve tweets.")
    //     }
    //     console.log(response);
    //     res.status(200).json(response.data);
    // })
}

module.exports = {getTweetsByHandle};