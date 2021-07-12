import { createSelector } from 'reselect';
import { get, rest } from 'lodash';

export const DEFAULT_ERROR_MESSAGE = `Something went wrong!`;

export const errorReducer = (state, action) => {
  if (!action.error) {
    return {
      ...state,
      error: null,
    };
  }
  // TODO: update with better error handling message from API
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

export const errorActionCreator = (errorType, error) => {
  return {
    type: errorType,
    error: true,
    payload: error,
  };
};

export function tryCatchWrapper(dispatch, errorType, f) {
  return (async function wrappedFn() {
    try {
      console.log(f);
      return await f.apply(this, arguments);
    } catch (err) {
      console.log('error here!');
      dispatch(errorActionCreator(errorType, err));
      return null;
    }
  })();
}

// TODO: might remove this later
export const createErrorSelector = (fn) => {
  return createSelector(fn, (storeIndex) =>
    get(storeIndex, 'error.data', null)
  );
};
