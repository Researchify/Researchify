/**
 * This file houses Action Creators for client homepage
 */
import * as api from '../api';
import { errorActionGlobalCreator } from '../notification/notificationReduxFunctions';
import { FETCH_HOMEPAGE, UPDATE_HOMEPAGE } from './types';

export const getHomepageDataByTeamId = (teamId) => async (dispatch) => {
  try {
    const { data } = await api.getHomepage(teamId);
    const homepageData = {
      teamId: data.teamId,
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
    const { data } = await api.createOrUpdateHomepage(teamId, homepageData);
    const updatedHomepage = {
      teamId: data.teamId,
      aboutUs: data.aboutUs,
    };
    dispatch({
      type: UPDATE_HOMEPAGE,
      payload: updatedHomepage,
    });
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};
