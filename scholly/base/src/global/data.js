/**
 * This module defines and exports variables representing data needed by the base application.
 * The value of each variable will be taken from a special "React Environment Variable" set at build time.
 * The Scholly service will set these environment variables before triggering the build of this base React app.
 *
 * @note: the set environment variables are treated as strings, therefore for the data represented as objects
 * (such as the publications), we need to parse them using JSON.parse().
 */


/// The list of publications the team has created for rendering in the publications page
export const TEAM_PUBLICATIONS = JSON.parse(process.env.REACT_APP_TEAM_PUBLICATIONS);

/// The team information object consists of team email, orgName, teamName and twitterHandle
export const TEAM_INFO = JSON.parse(process.env.REACT_APP_TEAM_INFO);

/// The list of team members the team has created for rendering in the team members page
export const TEAM_MEMBERS = JSON.parse(process.env.REACT_APP_TEAM_MEMBERS);
