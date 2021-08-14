const githubClientId = '03757c278dedad4b307d';
const scopes = 'repo';
const redirectUri = 'http://localhost:3000/dashboard';
export const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=${scopes}&allow_signup=false&redirect_uri=${redirectUri}`;

