import * as api from '../api';
import {
  GET_PUBLICATIONS_BY_TEAM_ID,
  CREATE_PUBLICATION,
  UPDATE_PUBLICATION,
  DELETE_PUBLICATION,
  CREATE_BULK_PUBLICATIONS,
  IMPORT_REQUEST,
  IMPORT_SUCCESS,
  IMPORT_FAIL,
  IMPORT_END,
  IMPORT_EMPTY,
  DELETE_BATCH_PUBLICATIONS,
} from './types';
import {
  errorActionGlobalCreator,
  successMessageCreator,
} from '../notification/notificationReduxFunctions';
import { pageSize } from '../config/publications';

export const getPublicationsByTeamId = (teamId) => async (dispatch) => {
  try {
    const { data } = await api.fetchPublicationsByTeamId(teamId);

    const newData = data.map((pub) => {
      const updatedPub = {
        ...pub,
        yearPublished: pub.yearPublished.substring(0, 4), // only get the year from the date format
      };
      return updatedPub;
    });

    dispatch({
      type: GET_PUBLICATIONS_BY_TEAM_ID,
      payload: newData,
    });
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const createPublication = (publication) => async (dispatch) => {
  try {
    const result = await api.createPublication(publication);
    result.data.yearPublished = result.data.yearPublished.substring(0, 4); // only get the year from the date format

    dispatch({
      type: CREATE_PUBLICATION,
      payload: { ...result.data, isNewlyAdded: true },
    });
    dispatch(successMessageCreator('Publication has been created'));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const deletePublication = (id) => async (dispatch) => {
  try {
    await api.deletePublication(id);

    dispatch({
      type: DELETE_PUBLICATION,
      payload: id,
    });
    dispatch(successMessageCreator('Publication has been deleted'));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const updatePublication = (id, publication) => async (dispatch) => {
  try {
    const { data } = await api.updatePublication(id, publication);
    data.yearPublished = data.yearPublished.substring(0, 4); // only get the year from the date format
    dispatch({
      type: UPDATE_PUBLICATION,
      payload: data,
    });
    dispatch(successMessageCreator('Publication has been updated'));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const importPublications = (authorId, startFrom, teamId) => async (dispatch) => {
  try {
    dispatch({
      type: IMPORT_REQUEST,
    });
    const result = await api.importPublications(authorId, startFrom, teamId);
    const pageNo = startFrom / pageSize + 1;
    if (result.data.reachedEnd) {
      // reached the end of the user's profile
      if (result.data.newPublications.length > 0) {
        dispatch({
          type: IMPORT_SUCCESS,
          payload: result.data.newPublications,
        });
      } else {
        dispatch({
          type: IMPORT_EMPTY,
        });
        dispatch(successMessageCreator('No publications left to retrieve!'));
      }
      dispatch({
        type: IMPORT_END,
      });
    } else if (
      result.data.newPublications.length === 0
        && result.data.retrieved > 0
    ) {
      // no new publications retrieved but not end of profile
      dispatch({
        type: IMPORT_EMPTY,
      });
      dispatch(
        successMessageCreator(
          `No new publications were found on page ${pageNo}`,
        ),
      );
    } else {
      dispatch({
        type: IMPORT_SUCCESS,
        payload: result.data.newPublications,
      });
      dispatch(
        successMessageCreator(`New publications were found on page ${pageNo}`),
      );
    }
  } catch (error) {
    dispatch({
      type: IMPORT_FAIL,
    });
    dispatch(errorActionGlobalCreator(error));
  }
};

export const createBulkPublications = (teamId, publicationList) => async (dispatch) => {
  try {
    const result = await api.createBulkPublications(teamId, publicationList);
    const createdPublications = result.data.map((pub) => ({
      ...pub,
      yearPublished: pub.yearPublished.substring(0, 4),
      isNewlyAdded: true,
    }));

    dispatch({
      type: CREATE_BULK_PUBLICATIONS,
      payload: createdPublications,
    });
    dispatch(successMessageCreator(`${createdPublications.length} publication(s) have been imported`));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const deleteBatchPublications = (publicationIdList) => async (dispatch) => {
  try {
    await api.deleteBatchPublications(publicationIdList);
    dispatch({
      type: DELETE_BATCH_PUBLICATIONS,
      payload: publicationIdList,
    });
    dispatch(successMessageCreator(`${publicationIdList.length} publication(s) have been deleted`));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};
