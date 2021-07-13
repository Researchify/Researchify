/**
 * This file houses our user-related Action Creators.
 */
import * as api from '../api';
import { ADD_USER_DATA, FETCH_USER_DATA } from './types';

export const fetchUserAction = () => async (dispatch) => {
  try {
    // TODO: remove this when JWT available
    const userId = '606c54aa3baac51e9c5ced29';
    const res = await api.fetchUserData(userId);
    dispatch({ type: FETCH_USER_DATA, payload: res.data });
  } catch (err) {
    console.error(`Error in getting user data from the api: ${err}`);
  }
};

/**
 * This action creator will be called when a user registers.
 *
 * @param userData object containing user email, team and organization name and password
 * @returns a thunk responsible for posting the data to the api and dispatching
 */
export const addUserAction = (userData, apiResult) => async (dispatch) => {
  try {
    const message = await api.addUserData(userData);
    console.log('API responded with: ');
    console.log(message);

    // We do not need to store the password, so create a new object without it and then dispatch
    const data = {
      email: userData.email,
      givenName: userData.givenName,
      familyName: userData.familyName,
    };

    // Store user related data in our redux global store
    dispatch({ type: ADD_USER_DATA, payload: data });
    apiResult(true);
  } catch (err) {
    console.error(`Error in posting user data to the api: ${err}`);
    apiResult(false);
  }
};
