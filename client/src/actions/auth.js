/**
 * This file houses our auth-related Action Creators.
 */
import * as api from '../api';
import { AUTH_SIGN_IN_REQUEST, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT, AUTH_SIGN_IN_FAIL, FETCH_TEAM_INFO } from './types';

/**
 * This action creator will be called when a user signs in.
 *
 * @param authData data associated to the authentication response.
 * @returns an action of type AUTH_SIGN_IN with the payload as the authData.
 */
export const signIn = (authData) => async(dispatch) => {
  try{
    dispatch ({
      type: AUTH_SIGN_IN_REQUEST
    })
    const result = await api.loginTeam(authData)
    dispatch({
      type: AUTH_SIGN_IN_SUCCESS
    })
    dispatch({
      type: FETCH_TEAM_INFO,
      payload: result.data
    })
  } catch (error){
    dispatch ({
      type: AUTH_SIGN_IN_FAIL,
      payload: error.response.data
    })
  }
};

/**
 * This action creator will be called when a user signs out.
 * @returns an action of type AUTH_SIGN_OUT.
 */
export const signOut = () => async(dispatch) => {
  try{
    const result = await api.logoutTeam()
    console.log(result)
    dispatch ({
      type: AUTH_SIGN_OUT
    })
  } catch(error){
    console.log(error.response.data)
  }
};
