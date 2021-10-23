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
  DELETE_BATCH_TEAM_MEMBERS,
  LOG_OUT,
  RESET_TEAM_DATA,
} from './types';
import { login } from './auth';
import {
  errorActionGlobalCreator,
  successMessageCreator,
} from '../notification/notificationReduxFunctions';

/**
 * Create a new team to database.
 * @param teamInfo contains teamName, orgName and email
 */
export const createTeam = (teamInfo, setFieldError) => async (dispatch) => {
  try {
    await api.createTeam(teamInfo);
    const authData = { email: teamInfo.email, password: teamInfo.password };
    dispatch(login(authData));
    dispatch(successMessageCreator('Team has been created')); // showing a success notification
  } catch (err) {
    // only show pop up error if it's not a client error, otherwise, show the error on the form instead
    if (err.response.status === 400) {
      // assuming the only client error is 'Email had been registered'
      setFieldError('email', 'Email has been registered');
    } else {
      dispatch(errorActionGlobalCreator(err));
    }
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
    dispatch(successMessageCreator('Team member has been created'));
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

/**
 * This action creator will be called when a user update the details of a team member
 *
 * @param teamId id of the team housing this member
 * @param memberId id of the member to be updated
 * @param teamMemberData the new member
 * @returns a thunk responsible for calling the api and dispatching a UPDATE_TEAM_MEMBER action
 */
export const updateTeamMember = (teamId, memberId, teamMemberData) => async (dispatch) => {
  try {
    await api.updateTeamMember(teamId, memberId, teamMemberData);

    dispatch({
      type: UPDATE_TEAM_MEMBER,
      payload: teamMemberData,
    });
    dispatch(successMessageCreator('Team member has been updated'));
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
    await api.deleteTeamMember(teamId, memberId);
    dispatch({
      type: DELETE_TEAM_MEMBER,
      payload: memberId,
    });
    dispatch(successMessageCreator('Team member has been deleted'));
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

export const getGHAccessToken = (teamId, code) => async (dispatch) => {
  try {
    const { data } = await api.getGHAccessToken(teamId, code);

    localStorage.setItem('GH_access_token', data.access_token);
    dispatch({
      type: GET_GH_ACCESS_TOKEN,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

export const deployToGHPages = (teamId, accessToken) => async (dispatch) => {
  try {
    dispatch({
      type: DEPLOY_REQUEST,
    });
    // get publications
    const { data: teamPublications } = await api.fetchPublicationsByTeamId(
      teamId,
    );
    const newTeamPubs = teamPublications.map(
      (pub) => {
        const updatedPub = {
          ...pub,
          yearPublished: pub.yearPublished.substring(0, 4), // only get the year from the date format
        };
        return updatedPub;
      },
    );
    // get teamInfo
    const { data: teamInfo } = await api.getTeamJWT();
    // get team members
    const { data: teamMembers } = await api.fetchTeamMembersByTeamId(teamId);
    // get team homepage content
    const { data: teamHomepage } = await api.getHomepage(teamId);
    // get user selected web pages to deploy
    const { data: teamSiteMetadata } = await api.getWebsiteInfo(teamId);
    // get achievements
    const { data: teamAchievements } = await api.fetchAchievementsByTeamId(teamId);

    const body = {
      ghToken: accessToken,
      teamPublications: newTeamPubs,
      teamInfo,
      teamMembers,
      teamHomepage,
      teamSiteMetadata,
      teamAchievements,
    };

    await api.deployToGHPages(teamId, body);
    dispatch({
      type: DEPLOY_SUCCESS,
    });
    dispatch(successMessageCreator('Deployed successfully'));
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
    profilePic: teamData.profilePic,
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
    const { data } = await api.updateTeam(teamId, teamData);
    const updatedTeam = teamDataAllocator(data);
    dispatch({
      type: UPDATE_TEAM,
      payload: updatedTeam,
    });
    dispatch(successMessageCreator('Team has been updated'));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

/**
 * This action creator will be called when a user wishes to delete their account
 * permanently. This is a HARD delete, so we won't be needing to explicitly
 * handle this action; instead, we gracefully log out the user once complete.
 *
 * @param teamId id of the team to be deleted from Researchify
 * @returns a thunk responsible for calling the API and dispatching a LOG_OUT action
 */
export const deleteTeam = (teamId) => async (dispatch) => {
  try {
    await api.deleteTeam(teamId);
    dispatch(successMessageCreator('Your account data has been deleted.'));
    // Gracefully exit by logging out.
    await api.logoutTeam();
    dispatch({ type: LOG_OUT });
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

/**
 * This action creator will be called when a user wishes to reset their account
 * data to initial values.
 * Note: this is a SOFT reset that enables users to start over with
 * Researchify.
 *
 * @param teamId id of the team whose data is to be reset
 * @returns a thunk responsible for calling the API and dispatching a RESET_TEAM_DATA action
 */
export const resetTeamData = (teamId) => async (dispatch) => {
  try {
    await api.resetTeamData(teamId);
    dispatch(successMessageCreator('Your account data has been reset.'));
    dispatch({ type: RESET_TEAM_DATA });
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const deleteBatchTeamMembers = (teamId, teamMemberIdList) => async (dispatch) => {
  try {
    await api.deleteBatchTeamMembers(teamId, teamMemberIdList);
    dispatch({
      type: DELETE_BATCH_TEAM_MEMBERS,
      payload: teamMemberIdList,
    });
    dispatch(successMessageCreator(`${teamMemberIdList.length} team member(s) have been deleted`));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

/**
 * This action creator will be called when a user wishes to delete their deployed website.
 *
 * @param teamId id of the team whose website is to be deleted
 * @returns a thunk responsible for calling the API to delete the website
 */
export const deleteGHPages = (teamId) => async (dispatch) => {
  try {
    // TODO: error handling + transition to storing the AT via cookies.
    const body = {
      ghToken: localStorage.getItem('GH_access_token'),
    };
    await api.deleteGHPages(teamId, body);
    dispatch(successMessageCreator('Your GitHub Pages website has been deleted.'));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};
