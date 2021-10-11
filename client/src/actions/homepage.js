/**
 * This file houses Action Creators for client homepage
 */
import * as api from '../api';
import { FETCH_HOMEPAGE, UPDATE_HOMEPAGE } from './types';
import {
  errorActionGlobalCreator,
  successMessageCreator,
} from '../notification/notificationReduxFunctions';

export const getHomepageDataByTeamId = (teamId) => async (dispatch) => {
  try {
    const { data } = await api.getHomepage(teamId);
    const homepageData = {
      teamId,
      aboutUs: data.aboutUs,
    };
    dispatch({
      type: FETCH_HOMEPAGE,
      payload: homepageData,
    });
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const updateHomepage = (teamId, homepageData) => async (dispatch) => {
  try {
    const body = {
      aboutUs: homepageData,
    };
    const { data } = await api.createOrUpdateHomepage(teamId, body);
    const updatedHomepage = {
      aboutUs: data.aboutUs,
    };
    dispatch({
      type: UPDATE_HOMEPAGE,
      payload: updatedHomepage,
    });
    dispatch(successMessageCreator('Saved'));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};
