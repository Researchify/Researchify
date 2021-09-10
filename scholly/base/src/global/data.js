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
  FAKE_TEAM_HOMEPAGE,
  FAKE_WEB_PAGES,
  FAKE_TEAM_ACHIEVEMENTS,
  FAKE_LAYOUT_OPTION,
} from './fakeData';

const env = process.env; // eslint-disable-line prefer-destructuring
const defaultLayout = 1;
let TEAM_PUBLICATIONS;
let TEAM_INFO;
let TEAM_MEMBERS;
let TEAM_HOMEPAGE;
let WEB_PAGES;
let TEAM_ACHIEVEMENTS;
let LAYOUT_OPTION;

if (!env.REACT_APP_DEBUG) {
  /// The list of publications the team has created for rendering in the publications page
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

  /// The homepage content of the team
  TEAM_HOMEPAGE = env.REACT_APP_TEAM_HOMEPAGE
    ? JSON.parse(env.REACT_APP_TEAM_HOMEPAGE)
    : null;

  WEB_PAGES = env.REACT_APP_WEB_PAGES
    ? JSON.parse(env.REACT_APP_WEB_PAGES)
    : [];

  /// The list of achievements the team has created for rendering in the achievements page
  TEAM_ACHIEVEMENTS = env.REACT_APP_TEAM_ACHIEVEMENTS
    ? JSON.parse(env.REACT_APP_TEAM_ACHIEVEMENTS)
    : [];

  LAYOUT_OPTION = defaultLayout;
} else {
  // Running client website locally, so use fake data
  console.log('Running in DEBUG mode, hence using fake data'); // eslint-disable-line no-console
  TEAM_PUBLICATIONS = FAKE_PUBLICATIONS;

  TEAM_INFO = FAKE_TEAM_INFO;

  TEAM_MEMBERS = FAKE_TEAM_MEMBERS;

  TEAM_HOMEPAGE = FAKE_TEAM_HOMEPAGE;

  WEB_PAGES = FAKE_WEB_PAGES;

  TEAM_ACHIEVEMENTS = FAKE_TEAM_ACHIEVEMENTS;

  LAYOUT_OPTION = FAKE_LAYOUT_OPTION;
}

export {
  TEAM_PUBLICATIONS,
  TEAM_INFO,
  TEAM_MEMBERS,
  TEAM_HOMEPAGE,
  TEAM_ACHIEVEMENTS,
  WEB_PAGES,
  LAYOUT_OPTION,
};
