/**
 * This file exports our auth reducer that will handle all dispatched auth-related actions.
 */
import Cookies from 'js-cookie';
import {
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_OUT, RESET_TEAM_DATA,
} from '../actions/types';

const INITIAL_AUTH_STATE = {
  logIn: !!Cookies.get('isLogin'),
  loading: false,
};

/**
 * This authReducer will handle all auth-related actions
 *
 * @param state the state initialized with an object with an authData property set to null.
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updated state.
 */
const authReducer = (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return { ...state, loading: true };
    case LOG_IN_SUCCESS:
      return { ...state, loading: false, logIn: true };
    case LOG_IN_FAIL:
      return { ...state, loading: false };
    case LOG_OUT:
      return { ...state, loading: false, logIn: false };
    case RESET_TEAM_DATA:
      return INITIAL_AUTH_STATE;
    default:
      return state;
  }
};

export default authReducer;
