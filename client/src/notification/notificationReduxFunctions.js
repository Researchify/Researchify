/**
 * This file exports notification related function and actions. 
 */

import { RESEARCHIFY_API_ERROR, SUCCESS_MESSAGE } from '../actions/types';

export const DEFAULT_ERROR_MESSAGE = `Something went wrong!`;

export const errorReducer = (state, action) => {
  if (!action.error) {
    return {
      ...state,
      error: null,
    };
  }
  const res = action.payload.response;
  return {
    ...state,
    error: {
      data: res.data !== '' ? res.data.errors[0] : DEFAULT_ERROR_MESSAGE,
      status: res.status,
      statusText: res.statusText,
    },
  };
};

export const errorActionGlobalCreator = (error) => {
  return {
    type: RESEARCHIFY_API_ERROR,
    error: true,
    payload: error,
  };
};

export const successMessageCreator = (successMessage) => {
  return {
    type: SUCCESS_MESSAGE,
    payload: successMessage
  }
}