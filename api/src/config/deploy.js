require('dotenv').config();

const githubClientId = '03757c278dedad4b307d';
const githubClientSecret = process.env.GH_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/dashboard';
const githubAccessTokenUrlStart = `https://github.com/login/oauth/access_token?client_id=${githubClientId}&client_secret=${githubClientSecret}&code=`;
const githubAccessTokenUrlEnd = `&redirect_uri=${redirectUri}`;
const schollyHost = 'http://localhost:8000'

module.exports = {
  githubAccessTokenUrlStart,
  githubAccessTokenUrlEnd,
  schollyHost
};
