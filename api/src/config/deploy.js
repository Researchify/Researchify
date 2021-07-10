require('dotenv').config();

const githubClientId = 'Iv1.e65c0eb97f822d12';
const githubClientSecret = process.env.GH_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/deploy';
const githubAccessTokenUrlStart = `https://github.com/login/oauth/access_token?client_id=${githubClientId}&client_secret=${githubClientSecret}&code=`;
const githubAccessTokenUrlEnd = `&redirect_uri=${redirectUri}`;

module.exports = {
  githubAccessTokenUrlStart,
  githubAccessTokenUrlEnd,
};
