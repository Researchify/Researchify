/**
 * This file houses our user-related Action Creators.
 */
import * as api from "../api";
import { ADD_USER_DATA } from "./types";

/**
 * This action creator will be called when a user registers.
 *
 * @param userData object containing user email, given and family name and password
 * @returns a thunk responsible for posting the data to the api and dispatching
 */
export const addUserAction = (userData) => async (dispatch) => {
  try {
    const message = await api.addUserData(userData);
    console.log("API responded with: ");
    console.log(message);

    // We do not need to store the password, so create a new object without it and then dispatch
    const data = {
      email: userData.email,
      givenName: userData.givenName,
      familyName: userData.familyName
    };

    // Store user related data in our redux global store
    // dispatch({ type: ADD_USER_DATA, payload: data });
  } catch (err) {
    console.error(`Error in posting user data to the api: ${err}`);
  }
};


export const loginUserAction = (userData, responseCallback) => async (dispatch) => {
  try {
    const message = await api.loginUser(userData);
    //FIXME: Need to check api response was okay or not
    console.log("API responded with: ");
    console.log(message);

    // We do not need to store the password, so create a new object without it and then dispatch
    //FIXME: This needs to change, so that login itself gets the user name since it will not be provided in userData.
    const data = {
      email: userData.email,
      givenName: userData.givenName,
      familyName: userData.familyName
    };

    // Store user related data in our redux global store
    dispatch({ type: ADD_USER_DATA, payload: data });

    responseCallback(message);
  } catch (err) {
    console.error(`Error in posting user data to the api: ${err}`);
  }
};

export const getCurrentUserAction = () => async (dispatch) => {
  try {
    const message = await api.getCurrentUser();
    console.log("API responded with: ");
    console.log(message);
  } catch (err) {
    console.error(`Error in posting user data to the api: ${err}`);
  }
};