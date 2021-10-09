/**
 * This file houses our achievement-related Action Creators.
 */
import * as api from '../api';
import {
  GET_ACHIEVEMENTS_BY_TEAM_ID,
  CREATE_ACHIEVEMENT,
  UPDATE_ACHIEVEMENT,
  DELETE_ACHIEVEMENT,
  DELETE_BATCH_ACHIEVEMENTS,
} from './types';
import {
  successMessageCreator,
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
    dispatch(successMessageCreator('Achievement has been created'));
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
    dispatch(successMessageCreator('Achievement has been deleted'));
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
    dispatch(successMessageCreator('Achievement has been updated'));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const deleteBatchAchievements = (achievementIdList) => async (dispatch) => {
  try {
    await api.deleteBatchAchievements(achievementIdList);
    dispatch({
      type: DELETE_BATCH_ACHIEVEMENTS,
      payload: achievementIdList,
    });
    dispatch(successMessageCreator(`${achievementIdList.length} achievements(s) have been deleted`));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};
