/**
 * This file houses our auth-related Action Creators.
 */
import * as api from '../api';
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT, SIGN_IN_FAIL, FETCH_TEAM_INFO, CLEAR_NOTIFICATION } from './types';
import { errorActionGlobalCreator } from '../notification/notificationReduxFunctions';


/**
 * This action creator will be called when a user signs in.
 *
 * @param authData data associated to the authentication response.
 * @returns an action of type AUTH_SIGN_IN with the payload as the authData.
 */
export const signIn = (authData) => async(dispatch) => {
  try{
    dispatch ({
      type: SIGN_IN_REQUEST
    })
    
    await api.loginTeam(authData)

    dispatch({
      type: SIGN_IN_SUCCESS
    })
  } catch (error){
    dispatch({
      type: SIGN_IN_FAIL
    })
    dispatch(errorActionGlobalCreator(error));
  }
};

/**
 * This action creator will be called when a user signs out.
 * @returns an action of type AUTH_SIGN_OUT.
 */
export const signOut = () => async(dispatch) => {
  try{
    await api.logoutTeam()
    dispatch ({
      type: SIGN_OUT
    })

    dispatch({
      type: CLEAR_NOTIFICATION
    })

  } catch(err){
    dispatch(errorActionGlobalCreator(err));
  }
};

export const authorizeJWT = () => async(dispatch) => {
  try{
    const { data } = await api.getTeamJWT()
    dispatch({
      type: SIGN_IN_SUCCESS
    })
    dispatch({
      type: FETCH_TEAM_INFO,
      payload: data
    })
  } catch(err){
    dispatch(errorActionGlobalCreator(err));
  }
}