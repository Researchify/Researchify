/**
 * This module spawns a subprocess used to run an "npm run build" on the base React App, with the
 * environment variables set to the site preferences data. The react app uses these variables for customizing
 * the content displayed for the researcher's site.
 *
 * TODO: use path.resolve to get path of base react app
 * TODO: use logging
 */
const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

const {REACT_APP_TEAM_TWITTER_HANDLE, REACT_APP_TEAM_PUBLICATIONS} = require('./data');


const PATH_TO_BASE_REACT_APP = path.join(__dirname, '..', '..', '/base');
const BUILD_TIMEOUT = 10000;


/**
 * This function spawns a process to build the React base app with the environment variables set to the
 * site preferences data.
 *
 * @param data the data to be used as environment variables for the base React app.
 */
async function buildBaseApp(data) {
    const build = spawn('npm', ['run', 'build', '--prefix', PATH_TO_BASE_REACT_APP], {
        cwd: PATH_TO_BASE_REACT_APP,
        env: {
            ...process.env,  // Keep the current process' Environment Variables
            [REACT_APP_TEAM_TWITTER_HANDLE]: data.teamTwitterHandle,
            [REACT_APP_TEAM_PUBLICATIONS]: data.teamPublications
        },
        timeout: BUILD_TIMEOUT
    });

    build.stdout.on('data', (data) => {
        winston.debug(`stdout: ${data}`);
    });

    build.stderr.on('data', (data) => {
        winston.error(`stderr: ${data}`);
    });

    build.on('close', (code) => {
        winston.info(`child process exited with code ${code}`);
    });
}

// to be executed after automated push to github repo
function cleanupBuild() {
    fs.rmdirSync(`${PATH_TO_BASE_REACT_APP}/build`, {recursive: true});
}


module.exports = buildBaseApp;