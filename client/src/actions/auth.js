/**
 * This file houses our auth-related Action Creators.
 */
import * as api from '../api';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT,
  LOG_IN_FAIL,
  FETCH_TEAM_INFO,
  FETCH_WEBSITE_INFO,
} from './types';
import { errorActionGlobalCreator, successMessageCreator } from '../notification/notificationReduxFunctions';

/**
 * This action creator will be called when a user signs in.
 *
 * @param authData data associated to the authentication response.
 * @returns an action of type AUTH_SIGN_IN with the payload as the authData.
 */
export const login = (authData, setFieldError) => async (dispatch) => {
  try {
    dispatch({
      type: LOG_IN_REQUEST,
    });
    await api.loginTeam(authData);
    dispatch({
      type: LOG_IN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOG_IN_FAIL,
    });
    // only show pop up error if it's not a client error, otherwise, show the error on the form instead
    if (error.response.status === 400) {
      // assuming the only client error is 'Incorrect email/passord'
      setFieldError('password', 'Incorrect email/password');
      setFieldError('email', ' ');
    } else {
      dispatch(errorActionGlobalCreator(error));
    }
  }
};

/**
 * This action creator will be called when a pwd needs to be reset
 *
 */
export const resetPassword = (email) => async (dispatch) => {
  try {
    await api.resetPwd(email);
    // eslint-disable-next-line
    console.log("success");
    dispatch(successMessageCreator('Password successfully reset'));
  } catch (err) {
    if (err) {
      // eslint-disable-next-line
      console.log(err);
      dispatch(errorActionGlobalCreator(err));
    }
  }
};

/**
 * This action creator will be called when a user signs out.
 * @returns an action of type AUTH_SIGN_OUT.
 */
export const logout = () => async (dispatch) => {
  try {
    await api.logoutTeam();
    dispatch({
      type: LOG_OUT,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

export const authorizeJWT = () => async (dispatch) => {
  try {
    const { data } = await api.getTeamJWT();
    const teamId = data._id;
    const { data: clientWebsiteData } = await api.getWebsiteInfo(teamId);

    dispatch({
      type: LOG_IN_SUCCESS,
    });
    dispatch({
      type: FETCH_TEAM_INFO,
      payload: data,
    });
    dispatch({
      type: FETCH_WEBSITE_INFO,
      payload: clientWebsiteData,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};
