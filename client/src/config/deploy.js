
const githubClientId = 'Iv1.e65c0eb97f822d12';
const scopes = 'repo';
const redirectUri = 'http://localhost:3000/deploy';
const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=${scopes}&allow_signup=false&redirect_uri=${redirectUri}`;


module.exports = {
  githubLoginUrl,
};
