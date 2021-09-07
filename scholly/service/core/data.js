/**
 * This module exports constants representing all the Environment Variables that need to be set when spawning
 * the subprocess to build the React base app.
 *
 * @note: the Environment Variables must be prefixed with "REACT_APP_"
 * @see: https://create-react-app.dev/docs/adding-custom-environment-variables/
 */

module.exports = {
  REACT_APP_TEAM_PUBLICATIONS: 'REACT_APP_TEAM_PUBLICATIONS',
  REACT_APP_TEAM_INFO: 'REACT_APP_TEAM_INFO',
  REACT_APP_TEAM_MEMBERS: 'REACT_APP_TEAM_MEMBERS',
  REACT_APP_TEAM_HOMEPAGE: 'REACT_APP_TEAM_HOMEPAGE',
  // Array containing names of pages that the client wants deployed
  REACT_APP_WEB_PAGES: 'REACT_APP_WEB_PAGES',
  REACT_APP_TEAM_ACHIEVEMENTS: 'REACT_APP_TEAM_ACHIEVEMENTS',
  REACT_APP_LAYOUT_OPTION: 'REACT_APP_LAYOUT_OPTION',
};
