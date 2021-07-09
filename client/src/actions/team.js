/**
 * This file houses our team-related Action Creators.
 */
import * as api from "../api";
import {
  LINK_TEAM_TWITTER,
  UNLINK_TEAM_TWITTER,
  FETCH_TEAM_INFO,
  GET_TEAM_MEMBERS_BY_TEAM_ID,
  CREATE_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  ADD_TEAM,
} from "./types";

/**
 * Adds a new team to redux store and database.
 * @param teamInfo contains teamName, orgName and emailnot
 */
export const addTeamInfo = (teamInfo, result) => async (dispatch) => {
  try {
    const data = await api.addTeam(teamInfo);
    const teamData = {
      ...teamInfo,
      teamId: data.data._id,
    };
    dispatch({
      type: ADD_TEAM,
      payload: teamData,
    });
    result(true, "");
  } catch (err) {
    result(false, err);
  }
};

/**
 * Finds a team
 * @param teamCredentials team email and password as a dictionary
 * @param teamPassword team account password
 */
export const getTeam = (teamCredentials, result) => async (dispatch) => {
  try {
    const data = await api.loginTeam(teamCredentials);
    const teamData = data.data.team;
    console.log(teamData);
    const team = {
      teamId: teamData._id,
      email: teamData.email,
      teamName: teamData.teamName,
      orgName: teamData.orgName,
      twitterHandle: teamData.twitterHandle,
      repoCreated: teamData.repoCreated,
    };
    dispatch({
      type: ADD_TEAM,
      payload: team,
    });
    result(true, "");
  } catch (err) {
    result(false, err);
  }
};

/**
 * This action creator will be called to populate a signed-in-user's team information.
 *
 * @note: this should be invoked just after a user has signed in as components such as the TwitterPanel
 * depend on the team information being populated.
 *
 * @note: this function returns a fake for now for the purposes of testing twitter integration.
 *
 * @param teamId id of the team for which to get team information.
 * @returns a thunk responsible for getting team information from the api and dispatching a FETCH_TEAM_INFO action
 */
export const getTeamInfo = (teamId) => async (dispatch) => {
  try {
    const { data } = api.fetchTeamInfo(teamId);
    console.log(data);
    dispatch({
      type: FETCH_TEAM_INFO,
      payload: data,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * This action creator will be called when a researcher links their twitter account for their research team to
 * show tweets.
 *
 * @param teamId id of the team to which the handle is to be associated.
 * @param handle the twitter handle the researcher wishes to associate with their site.
 * @returns a thunk responsible for posting the handle to the api and dispatching a LINK_TEAM_TWITTER action
 */
export const linkTwitter = (teamId, handle) => async (dispatch) => {
  try {
    const { data } = await api.registerTwitterHandle(teamId, {
      twitterHandle: handle,
    });
    dispatch({
      type: LINK_TEAM_TWITTER,
      payload: data.twitterHandle,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      // if linking unsuccessful, set payload to empty string and dispatch
      type: LINK_TEAM_TWITTER,
      payload: null,
    });
  }
};

/**
 * This action creator will be called when a researcher de-registers a previously-linked twitter handle for their team.
 *
 * @param teamId id of the team to which the handle is to be disassociated.
 * @returns a thunk responsible for posting the handle to the api and dispatching an UNLINK_TEAM_TWITTER action.
 */
export const unlinkTwitter = (teamId) => async (dispatch) => {
  try {
    const { data } = await api.deregisterTwitterHandle(teamId, {
      twitterHandle: "",
    });
    dispatch({
      type: UNLINK_TEAM_TWITTER,
      payload: data.twitterHandle,
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * This action creator will be called when a user click on the team page to retrieve all the team members from that team
 *
 * @param teamId id of the team
 * @returns a thunk responsible for calling the api and dispatching a GET_TEAM_MEMBERS_BY_TEAM_ID action
 */
export const getTeamMembersByTeamId = (teamId) => async (dispatch) => {
  try {
    const { data } = await api.fetchTeamMembersByTeamId(teamId);

    dispatch({
      type: GET_TEAM_MEMBERS_BY_TEAM_ID,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This action creator will be called when a user create a new team member to the team
 * show tweets.
 *
 * @param teamId id of the team
 * @param teamMember the new team member
 * @returns a thunk responsible for calling api and dispatching a CREATE_TEAM_MEMBER action
 */
export const createTeamMember = (teamId, teamMember) => async (dispatch) => {
  try {
    const { data } = await api.createTeamMember(teamId, teamMember);

    dispatch({
      type: CREATE_TEAM_MEMBER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This action creator will be called when a user update the details of a team member
 *
 * @param teamId id of the team
 * @param teamMember the updated new member
 * @returns a thunk responsible for calling the api and dispatching a UPDATE_TEAM_MEMBER action
 */
export const updateTeamMember = (id, teamMember) => async (dispatch) => {
  try {
    console.log("updateTeamMember");
    const { data } = await api.updateTeamMember(id, teamMember);

    console.log(data);

    dispatch({
      type: UPDATE_TEAM_MEMBER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This action creator will be called when a user remove a team member from the team
 *
 * @param teamId id of the team
 * @param memberId id of the team member
 * @returns a thunk responsible for calling the api and dispatching a DELETE_TEAM_MEMBER action
 */
export const deleteTeamMember = (teamId, memberId) => async (dispatch) => {
  try {
    console.log(teamId, memberId);
    await api.deleteTeamMember(teamId, memberId);
    dispatch({
      type: DELETE_TEAM_MEMBER,
      payload: memberId,
    });
  } catch (error) {
    console.log(error);
  }
};
