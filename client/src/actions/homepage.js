/**
 * This file houses Action Creators for client homepage
 */
import * as api from '../api';
import { FETCH_HOMEPAGE, UPDATE_HOMEPAGE } from './types';

export const getHomepageDataByTeamId = (teamId) => async (dispatch) => {
  try {
    const { data } = await api.getHomepage(teamId);
    const homepageData = {
      teamId: teamId,
      aboutUs: data.aboutUs,
    };
    dispatch({
      type: FETCH_HOMEPAGE,
      payload: homepageData,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateHomepage = (teamId, homepageData) => async (dispatch) => {
  try {
    const { data } = await api.createOrUpdateHomepage(teamId, homepageData);
    const updatedHomepage = {
      teamId: teamId,
      aboutUs: data.aboutUs,
    };
    dispatch({
      type: UPDATE_HOMEPAGE,
      payload: updatedHomepage,
    });
  } catch (error) {
    console.error(error);
  }
};
