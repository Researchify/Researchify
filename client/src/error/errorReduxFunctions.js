import { createSelector } from 'reselect';
import { get } from 'lodash';
import { RESEARCHIFY_API_ERROR } from '../actions/types';

export const DEFAULT_ERROR_MESSAGE = `Something went wrong!`;

export const errorReducer = (state, action) => {
  if (!action.error) {
    return {
      ...state,
      error: null,
    };
  }
  // TODO: update with better error handling message from API/server
  /** something like this:
   * {
      "errorCode": "1001",
      "errorMessage": "Validation error has occurred.",
      "errors": {
        "description": "Must not be null",
        "name": "Must not be null"
      },
      "errorTimestamp": "2020-03-06T08:14:03.690Z"
    }
   */
  const res = action.payload.response;
  return {
    ...state,
    error: {
      data: res.data !== '' ? res.data : DEFAULT_ERROR_MESSAGE,
      status: res.status,
      statusText: res.statusText,
    },
  };
};

/**
 * use this at dispatcher to assign unique ERROR type
 * @param {*} errorType REDUX_REDUCER_FORMAT
 * @param {*} error from catch
 * @returns redux action format
 */
export const errorActionCreator = (errorType, error) => {
  return {
    type: errorType,
    error: true,
    payload: error,
  };
};

export const errorActionGlobalCreator = (error) => {
  return {
    type: RESEARCHIFY_API_ERROR,
    error: true,
    payload: error,
  };
};

// FIXME: remove this if we don't have any selector
export const createErrorSelector = (fn) => {
  return createSelector(fn, (storeIndex) =>
    get(storeIndex, 'error.data', null)
  );
};
