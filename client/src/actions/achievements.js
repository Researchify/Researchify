/**
 * This file houses our achievement-related Action Creators.
 */
import * as api from '../api';
import {
  GET_ACHIEVEMENTS_BY_TEAM_ID,
  CREATE_ACHIEVEMENT,
  UPDATE_ACHIEVEMENT,
  DELETE_ACHIEVEMENT,
} from './types';
import {
  errorActionGlobalCreator,
} from '../notification/notificationReduxFunctions';

export const getAchievementsByTeamId = (teamId) => async (dispatch) => {
  try {
    const { data } = await api.fetchAchievementsByTeamId(teamId);

    dispatch({
      type: GET_ACHIEVEMENTS_BY_TEAM_ID,
      payload: data,
    });
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const createAchievement = (achievement) => async (dispatch) => {
  try {
    const result = await api.createAchievement(achievement);

    dispatch({
      type: CREATE_ACHIEVEMENT,
      payload: { ...result.data, newlyAdded: true },
    });
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const deleteAchievement = (id) => async (dispatch) => {
  try {
    await api.deleteAchievement(id);

    dispatch({
      type: DELETE_ACHIEVEMENT,
      payload: id,
    });
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const updateAchievement = (id, achievement) => async (dispatch) => {
  try {
    const { data } = await api.updateAchievement(id, achievement);
    dispatch({
      type: UPDATE_ACHIEVEMENT,
      payload: data,
    });
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};
