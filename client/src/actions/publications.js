import * as api from '../api';
import {
  GET_PUBLICATIONS_BY_TEAM_ID,
  CREATE_PUBLICATION,
  UPDATE_PUBLICATION,
  DELETE_PUBLICATION,
  SORT_PUBLICATIONS,
  CREATE_BULK_PUBLICATIONS,
  IMPORT_REQUEST,
  IMPORT_SUCCESS,
  IMPORT_FAIL,
  IMPORT_END,
  IMPORT_EMPTY,
} from './types';
import {
  errorActionGlobalCreator,
  successMessageCreator,
} from '../notification/notificationReduxFunctions';
import { pageSize } from '../config/publications';
import { errorActionGlobalCreator } from '../notification/notificationReduxFunctions';

export const getPublicationsByTeamId = (teamId) => async (dispatch) => {
  try {
    const { data } = await api.fetchPublicationsByTeamId(teamId);

    data.map((pub) => (pub.yearPublished = pub.yearPublished.substring(0, 4))); // only get the year from the date format

    dispatch({
      type: GET_PUBLICATIONS_BY_TEAM_ID,
      payload: data,
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
      payload: { ...result.data, newlyAdded: true },
    });
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
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};

export const sortPublications =
  (teamPublications, sortingOption) => async (dispatch) => {
    switch (sortingOption) {
      case 'Author':
        teamPublications.sort((a, b) =>
          a.authors[0].toLowerCase() > b.authors[0].toLowerCase() ? 1 : -1
        );
        break;
      case 'Title':
        // publication title
        teamPublications.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
        break;
      case 'Category Title':
        // journal or conference title
        teamPublications.sort((a, b) =>
          a.category.categoryTitle.toLowerCase() >
          b.category.categoryTitle.toLowerCase()
            ? 1
            : -1
        );
        break;
      default:
        // sort by title then year for consistency with the db
        teamPublications.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
        teamPublications.sort((a, b) => (a.year > b.year ? -1 : 1));
        break;
    }

    dispatch({
      type: SORT_PUBLICATIONS,
      payload: teamPublications,
    });
  };

export const importPublication =
  (gScholarId, startFrom, teamId) => async (dispatch) => {
    try {
      dispatch({
        type: IMPORT_REQUEST,
      });
      console.log(startFrom);
      const result = await api.importPublications(
        gScholarId,
        startFrom,
        teamId
      );
      if (
        result.data.newPublications.length === 0 &&
        result.data.retrieved > 0
      ) {
        const pageNo = startFrom / pageSize + 1;
        dispatch({
          type: IMPORT_EMPTY,
          payload:
            'No new publications found so far...We can continue searching.',
        });
        dispatch(
          successMessageCreator(
            'No new publications were found on page ' + pageNo
          )
        );
      } else {
        dispatch({
          type: IMPORT_SUCCESS,
          payload: result.data.newPublications,
        });
      }
    } catch (error) {
      dispatch({
        type: IMPORT_FAIL,
        payload: error.response,
      });
      dispatch(errorActionGlobalCreator(error));
    }
  };

export const retrieveMorePublications =
  (author_id, startFrom, teamId) => async (dispatch) => {
    try {
      dispatch({
        type: IMPORT_REQUEST,
      });
      console.log('retrieve more');
      console.log(startFrom);
      const result = await api.importPublications(author_id, startFrom, teamId);
      const pageNo = startFrom / pageSize + 1;

      if (result.data.reachedEnd === true) {
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
        result.data.newPublications.length === 0 &&
        result.data.retrieved > 0
      ) {
        // no new pubs retrieved but not end of profile
        dispatch({
          type: IMPORT_EMPTY,
        });
        dispatch(
          successMessageCreator(
            'No new publications were found on page ' + pageNo
          )
        );
      } else {
        dispatch({
          type: IMPORT_SUCCESS,
          payload: result.data.newPublications,
        });
        dispatch(
          successMessageCreator(
            'New publications were found on page ' + pageNo
          )
        );
      }
    } catch (error) {
      dispatch({
        type: IMPORT_FAIL,
        payload: error.response.data,
      });
      dispatch(errorActionGlobalCreator(error));
    }
  };

export const createBulkPublications =
  (teamId, publicationList) => async (dispatch) => {
    try {
      const result = await api.createBulkPublications(teamId, publicationList);
      let createdPublications = result.data.map((pub) => ({
        ...pub,
        yearPublished: pub.yearPublished.substring(0, 4),
        newlyAdded: true,
      }));

      dispatch({
        type: CREATE_BULK_PUBLICATIONS,
        payload: createdPublications,
      });
    } catch (error) {
      dispatch(errorActionGlobalCreator(error));
    }
  };
