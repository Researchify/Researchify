/**
 * This file exports our auth reducer that will handle all dispatched auth-related actions.
 */
import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from '../actions/types';

const INITIAL_AUTH_STATE = { authData: null };

/**
 * This authReducer will handle all auth-related actions, i.e. AUTH_SIGN_IN and AUTH_SIGN_OUT.
 *
 * @param state the state initialized with an object with an authData property set to null.
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updated state.
 */
const authReducer = (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return { authData: action.payload };
    case AUTH_SIGN_OUT:
      return { authData: null };
    default:
      return state;
  }
};

export default authReducer;
