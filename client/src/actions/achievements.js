import * as api from '../api';
import {
    GET_ACHIEVEMENTS_BY_TEAM_ID,
    CREATE_ACHIEVEMENT,
    UPDATE_ACHIEVEMENT,
    DELETE_ACHIEVEMENT,
} from './types';
import {
  errorActionGlobalCreator,
  successMessageCreator,
} from '../notification/notificationReduxFunctions';

export const getAchievementsByTeamId = (teamId) => async (dispatch) => {
    try {
      const { data } = await api.fetchAchievementsByTeamId(teamId);
  
      data.map((pub) => (pub.yearPublished = pub.yearPublished.substring(0, 4))); // only get the year from the date format
  
      dispatch({
        type: GET_ACHIEVEMENTS_BY_TEAM_ID,
        payload: data,
      });
    } catch (error) {
      dispatch(errorActionGlobalCreator(error));
    }
  };
  
export const createAchievement = (publication) => async (dispatch) => {
    try {
        const result = await api.createAchievement(publication);

        result.data.yearPublished = result.data.yearPublished.substring(0, 4); // only get the year from the date format

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
  
export const updateAchievement = (id, publication) => async (dispatch) => {
    try {
        const { data } = await api.updateAchievement(id, publication);
        data.yearPublished = data.yearPublished.substring(0, 4); // only get the year from the date format
        dispatch({
        type: UPDATE_ACHIEVEMENT,
        payload: data,
        });
    } catch (error) {
        dispatch(errorActionGlobalCreator(error));
    }
};