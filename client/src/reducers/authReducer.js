/**
 * This file exports our auth reducer that will handle all dispatched auth-related actions.
 */
import { LOG_IN_REQUEST, LOG_IN_SUCCESS,LOG_IN_FAIL,LOG_OUT, REGISTER_SUCCESS } from '../actions/types';
import Cookies from 'js-cookie';

const INITIAL_AUTH_STATE = { 
  logIn: Cookies.get('isLogin') ? true : false,
  loading: false,
  isRegistered: null,
  logoutAlert: false,
}

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
    case REGISTER_SUCCESS:
      return { ...state, isRegistered: true};
    default:
      return state; 
  }
};

export default authReducer;
