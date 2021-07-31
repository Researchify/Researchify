/**
 * This module spawns a subprocess used to run an "npm run build" on the base React App, with the
 * environment variables set to the site preferences data. The react app uses these variables for customizing
 * the content displayed for the researcher's site.
 */
const { spawn } = require('child_process');
const path = require('path');
const winston = require('winston');
const which = require('which');

const {
  REACT_APP_TEAM_TWITTER_HANDLE,
  REACT_APP_TEAM_PUBLICATIONS,
} = require('./data');

const PATH_TO_BASE_REACT_APP = path.join(__dirname, '..', '..', '/base');
const BUILD_TIMEOUT = 10000;

/**
 * This function spawns a process to build the React base app with the environment variables set to the
 * site preferences data.
 *
 * @param data the data to be used as environment variables for the base React app.
 * @throws Error if the build failed.
 */
async function buildBaseApp(data) {
  // windows users: see https://stackoverflow.com/questions/22575662/filename-too-long-in-git-for-windows
  // if it fails here
  const npm = which.sync('npm');
  const build = spawn(
    npm,
    ['run', 'build', '--prefix', PATH_TO_BASE_REACT_APP],
    {
      cwd: PATH_TO_BASE_REACT_APP,
      env: {
        ...process.env, // Keep the current process' Environment Variables
        [REACT_APP_TEAM_TWITTER_HANDLE]: data.teamTwitterHandle,
        [REACT_APP_TEAM_PUBLICATIONS]: JSON.stringify(data.teamPublications),
      },
      timeout: BUILD_TIMEOUT,
    }
  );

  build.stdout.on('data', (data) => {
    winston.debug(`stdout: ${data}`);
  });
  build.stderr.on('data', (data) => {
    winston.debug(`stderr: ${data}`);
  });

  return new Promise((resolve, reject) => {
    build.on('close', (code) => {
      winston.info(`child process exited with code ${code}`);
      if (code) {
        reject(`Failed to build base application. Code: ${code}`);
      }
      resolve(code);
    });
  });
}

module.exports = buildBaseApp;