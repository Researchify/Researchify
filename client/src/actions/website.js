/**
 * This file houses Action Creaters for client website
 */
import {
  CREATE_WEBSITE,
  DELETE_WEBSITE,
  ADD_WEBPAGE,
  DELETE_WEBPAGE,
  UPDATE_PUBLICATION_OPTIONS,
} from './types';
import { errorActionGlobalCreator, successMessageCreator } from '../notification/notificationReduxFunctions';
import * as api from '../api';

/**
 * Action called when 'create website' button is clicked
 */
export const createWebsite = () => {
  return {
    type: CREATE_WEBSITE,
  };
};

/**
 * Action called when user choose to delete the website
 */
export const deleteWebsite = () => {
  return {
    type: DELETE_WEBSITE,
  };
};

/**
 * Adds a new client web-page to redux store and database.
 * @param teamInfo contains teamName, orgName and email
 */
export const addPage = (teamId, pageName) => async (dispatch) => {
  try {
    const apiBody = {
      pageName: pageName,
    };
    await api.addWebPage(teamId, apiBody);

    dispatch({
      type: ADD_WEBPAGE,
      payload: pageName,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

/**
 * Deletes info about a client's web-page from redux store and database.
 * @param teamInfo contains teamName, orgName and email
 */
export const deletePage = (teamId, pageName) => async (dispatch) => {
  const apiBody = {
    pageName: pageName,
  };
  api.deleteWebPage(teamId, apiBody).then(
    dispatch({
      type: DELETE_WEBPAGE,
      payload: pageName,
    })
  );
};

export const updatePublicationOptions = (teamId, preference) => async (dispatch) => {
  try{
    const { data } = await api.updatePublicationOptions(teamId, preference)
    dispatch({
      type: UPDATE_PUBLICATION_OPTIONS,
      payload: data,
    })
    dispatch(successMessageCreator('Preference had been updated'))
  } catch(err){
    dispatch(errorActionGlobalCreator(err));
  }
};