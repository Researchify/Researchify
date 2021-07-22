/**
 * This file houses our auth-related Action Creators.
 */
import * as api from '../api';
import { GET_TEAM_JWT, AUTH_SIGN_IN_REQUEST, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT, FETCH_TEAM_INFO } from './types';
import { errorActionGlobalCreator } from '../error/errorReduxFunctions';

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

    localStorage.setItem('login', 'true')
  } catch (error){
    dispatch(errorActionGlobalCreator(error));
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
    localStorage.removeItem('login')
  } catch(err){
    dispatch(errorActionGlobalCreator(err));
  }
};

export const authorizeJWT = () => async(dispatch) => {
  try{
    console.log("authorize JWT")
    const { data } = await api.getTeamJWT()
    console.log("jwt decoded team", data)
    dispatch({
      type: AUTH_SIGN_IN_SUCCESS
    })
    dispatch({
      type: GET_TEAM_JWT,
      payload: data
    })

    
  }catch(err){
    dispatch(errorActionGlobalCreator(err));
  }
}