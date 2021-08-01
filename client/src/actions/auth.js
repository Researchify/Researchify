/**
 * This file houses our auth-related Action Creators.
 */
import * as api from '../api';
import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN_FAIL,
  FETCH_TEAM_INFO,
  CLEAR_ERROR,
  FETCH_WEBSITE_INFO,
} from './types';
import { errorActionGlobalCreator } from '../error/errorReduxFunctions';

/**
 * This action creator will be called when a user signs in.
 *
 * @param authData data associated to the authentication response.
 * @returns an action of type AUTH_SIGN_IN with the payload as the authData.
 */
export const signIn = (authData) => async (dispatch) => {

  try {
    dispatch({
      type: AUTH_SIGN_IN_REQUEST,
    });
    const { data } = await api.loginTeam(authData);
    const teamId = data._id;
    await api
    .getWebsiteInfo(teamId)
    .then((clientWebsiteInfo) => {
      console.log(clientWebsiteInfo);
      dispatch({
        type: FETCH_WEBSITE_INFO,
        payload: clientWebsiteInfo.data,
      });
    })
    .catch((err) => {
      if (err.response.status !== 404) {
        throw err;
      }
    });
    dispatch({
      type: AUTH_SIGN_IN_SUCCESS,
    });
    dispatch({
      type: FETCH_TEAM_INFO,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_SIGN_IN_FAIL,
    });
    dispatch(errorActionGlobalCreator(error));
  }
};

/**
 * This action creator will be called when a user signs out.
 * @returns an action of type AUTH_SIGN_OUT.
 */
export const signOut = () => async (dispatch) => {
  try {
    await api.logoutTeam();
    dispatch({
      type: AUTH_SIGN_OUT,
    });

    dispatch({
      type: CLEAR_ERROR,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

export const authorizeJWT = () => async (dispatch) => {
  try {
    const { data } = await api.getTeamJWT();
    const teamId = data._id;
    await api
    .getWebsiteInfo(teamId)
    .then((clientWebsiteInfo) => {
      console.log(clientWebsiteInfo);
      dispatch({
        type: FETCH_WEBSITE_INFO,
        payload: clientWebsiteInfo.data,
      });
    })
    .catch((err) => {
      if (err.response.status !== 404) {
        console.log("Found ! 404");
        throw err;
      }
      console.log("Error, if 404 that's fine");
    });
    dispatch({
      type: AUTH_SIGN_IN_SUCCESS,
    });
    dispatch({
      type: FETCH_TEAM_INFO,
      payload: data,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};
