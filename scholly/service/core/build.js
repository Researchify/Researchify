/**
 * This module spawns a subprocess used to run an "npm run build" on the base React App, with the
 * environment variables set to the site preferences data. The react app uses these variables for customizing
 * the content displayed for the researcher's site.
 */
const path = require('path');
const util = require('util');
const logger = require('winston');
const execFile = util.promisify(require('child_process').execFile);

const {
  REACT_APP_TEAM_INFO,
  REACT_APP_TEAM_PUBLICATIONS,
  REACT_APP_TEAM_MEMBERS,
  REACT_APP_TEAM_HOMEPAGE,
  REACT_APP_WEB_PAGES,
  REACT_APP_TEAM_ACHIEVEMENTS,
} = require('./data');

const PATH_TO_BASE_REACT_APP = path.join(__dirname, '..', '..', '/base');
const BUILD_TIMEOUT = 100000; // 100 seconds to build.
const BUILD_COMMAND = 'npm';
const BUILD_ARGS = ['run', 'build'];

/// To support Windows developers: https://stackoverflow.com/a/54515183/15507541
const useShell = process.env.NODE_ENV !== 'production';

/**
 * This function spawns a process to build the React base app with the environment variables set to the
 * site preferences data.
 *
 * @param data the data to be used as environment variables for the base React app.
 * @throws Error if the build failed.
 */
async function buildBaseApp(data) {
  let stdout; // Capture stdout of the spawned subprocess.
  let stderr; // Capture stderr of the spawned subprocess.
  try {
    ({
      stdout,
      stderr,
    } = await execFile(
      BUILD_COMMAND, BUILD_ARGS,
      {
        cwd: PATH_TO_BASE_REACT_APP,
        env: {
          ...process.env, // Retain the current process' Environment Variables.
          [REACT_APP_TEAM_PUBLICATIONS]: JSON.stringify(data.teamPublications),
          [REACT_APP_TEAM_INFO]: JSON.stringify(data.teamInfo),
          [REACT_APP_TEAM_MEMBERS]: JSON.stringify(data.teamMembers),
          [REACT_APP_TEAM_HOMEPAGE]: JSON.stringify(data.teamHomepage),
          [REACT_APP_WEB_PAGES]: JSON.stringify(data.webPages),
          [REACT_APP_TEAM_ACHIEVEMENTS]: JSON.stringify(data.teamAchievements),
        },
        timeout: BUILD_TIMEOUT,
        shell: useShell,
      },
    ));
    logger.info('Base app built successfully.');
  } catch (err) {
    throw new Error(
      `An error occurred while trying to build the base app: ${err.message}`,
    );
  } finally {
    // These may not hold values if exec() fails.
    if (stdout) {
      logger.debug(stdout);
    }
    if (stderr) {
      logger.error(stderr);
    }
  }
}

module.exports = buildBaseApp;
