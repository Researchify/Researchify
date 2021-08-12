/**
 * This file houses our team-related Action Creators.
 */
import * as api from '../api';
import {
  LINK_TEAM_TWITTER,
  UNLINK_TEAM_TWITTER,
  FETCH_TEAM_INFO,
  GET_TEAM_MEMBERS_BY_TEAM_ID,
  CREATE_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  GET_GH_ACCESS_TOKEN,
  DEPLOY_REQUEST,
  DEPLOY_SUCCESS,
  DEPLOY_FAIL,
  UPDATE_TEAM,
  REGISTER_SUCCESS,
} from './types';
import { errorActionGlobalCreator, successMessageCreator } from '../notification/notificationReduxFunctions';

/**
 * Create a new team to database.
 * @param teamInfo contains teamName, orgName and email
 */
export const createTeam = (teamInfo) => async (dispatch) => {
  try{
    await api.createTeam(teamInfo)
    dispatch(successMessageCreator("Team has been created")); // showing a success notification  
    dispatch({ // when user has been registered successfully to allow us to go back to the login page
      type: REGISTER_SUCCESS
    })
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
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
    const { data } = await api.fetchTeamInfo(teamId);
    const teamData = teamDataAllocator(data);
    dispatch({
      type: FETCH_TEAM_INFO,
      payload: teamData,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
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
    dispatch(errorActionGlobalCreator(err));
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
      twitterHandle: '',
    });
    dispatch({
      type: UNLINK_TEAM_TWITTER,
      payload: data.twitterHandle,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
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
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
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
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
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
    console.log('updateTeamMember');
    const { data } = await api.updateTeamMember(id, teamMember);

    console.log(data);

    dispatch({
      type: UPDATE_TEAM_MEMBER,
      payload: data,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
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
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

export const getGHAccessToken = (teamId, code) => async (dispatch) => {
  try {
    console.log(teamId);
    const response = await api.getGHAccessToken(teamId, code);
    
    localStorage.setItem('GH_access_token', response.data.access_token);
    dispatch({
      type: GET_GH_ACCESS_TOKEN,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deployToGHPages =
  (teamId, accessToken) => async (dispatch) => {
    try {
      dispatch({
        type: DEPLOY_REQUEST,
      });
      // get publications
      const { data: teamPublications } = await api.fetchPublicationsByTeamId(teamId);
      teamPublications.map(
        (pub) => (pub.yearPublished = pub.yearPublished.substring(0, 4))
      );
      //get teamInfo
      const { data: teamInfo } = await api.getTeamJWT()
      //get team members
      const { data: teamMembers } = await api.fetchTeamMembersByTeamId(teamId);

      const body = {
        ghToken: accessToken,
        teamPublications,
        teamInfo,
        teamMembers
      };

      const response = await api.deployToGHPages(teamId, body);
      console.log(response.data);
      dispatch({
        type: DEPLOY_SUCCESS,
      }); 
      dispatch(successMessageCreator('Deployed successfully'))
    } catch (err) {
      dispatch(errorActionGlobalCreator(err));
      dispatch({
        type: DEPLOY_FAIL,
      });
    }
  };

/**
 * A function to allocates team data from back-end.
 * @param {*} teamData raw data from back-end
 * @returns full team data that adheres to team state
 * @see teamReducer#INITIAL_TEAM_STATE
 */
function teamDataAllocator(teamData) {
  return {
    teamId: teamData._id,
    email: teamData.email,
    teamName: teamData.teamName,
    orgName: teamData.orgName,
    twitterHandle: teamData.twitterHandle,
    repoCreated: teamData.repoCreated,
    error: null,
    retrievedAccessToken: false,
    themeId: teamData.themeId,
  };
}

/**
 * This action creator will be called when a user want to update the team profile
 *
 * @param {*} teamId id of the team
 * @param {*} teamData data object of the data to be patched
 * @returns
 */
export const updateTeam = (teamId, teamData) => async (dispatch) => {
  try {
    const { data } = await api.updateTeam(teamId, teamData)
    const updatedTeam = teamDataAllocator(data);
    dispatch({
      type: UPDATE_TEAM,
      payload: updatedTeam,
    });
    dispatch(successMessageCreator("Team has been updated"));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

/**
 * This action creater find/create a new theme and update it in team data.
 * @param {*} teamId
 * @param {*} themeData
 * @returns
 */
export const updateTeamTheme = (teamId, themeData) => async (dispatch) => {
  try {
    const updatedTheme = await api.findOrCreateTheme(themeData);
    const updatedThemeId = updatedTheme.data._id;
    const { data } = await api.updateTeam(teamId, {
      themeId: updatedThemeId,
    });
    const updatedTeam = teamDataAllocator(data);
    dispatch({
      type: UPDATE_TEAM,
      payload: updatedTeam,
    });
  } catch (error) {
    console.error(error);
  }
};
