/**
 * This module defines and exports variables representing data needed by the base application.
 * The value of each variable will be taken from a special "React Environment Variable" set at build time.
 * The Scholly service will set these environment variables before triggering the build of this base React app.
 *
 * @note: the set environment variables are treated as strings, therefore for the data represented as objects
 * (such as the publications), we need to parse them using JSON.parse().
 */
import {
  FAKE_PUBLICATIONS,
  FAKE_TEAM_INFO,
  FAKE_TEAM_MEMBERS,
} from './fakeData';

const env = process.env;
let TEAM_PUBLICATIONS;
let TEAM_INFO;
let TEAM_MEMBERS;

if (env.REACT_APP_DEPLOYING === 'true') {
  TEAM_PUBLICATIONS = env.REACT_APP_TEAM_PUBLICATIONS
    ? JSON.parse(env.REACT_APP_TEAM_PUBLICATIONS)
    : [];

  /// The team information object consists of team email, orgName, teamName and twitterHandle
  TEAM_INFO = env.REACT_APP_TEAM_INFO
    ? JSON.parse(env.REACT_APP_TEAM_INFO)
    : null;

  /// The list of team members the team has created for rendering in the team members page
  TEAM_MEMBERS = env.REACT_APP_TEAM_MEMBERS
    ? JSON.parse(env.REACT_APP_TEAM_MEMBERS)
    : [];
} else {
  // Running client website locally, so use fake data
  TEAM_PUBLICATIONS = FAKE_PUBLICATIONS;

  TEAM_INFO = FAKE_TEAM_INFO;

  TEAM_MEMBERS = FAKE_TEAM_MEMBERS;
}

export { TEAM_PUBLICATIONS, TEAM_INFO, TEAM_MEMBERS };
