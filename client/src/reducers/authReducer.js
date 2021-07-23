/**
 * This file exports our auth reducer that will handle all dispatched auth-related actions.
 */
import { AUTH_SIGN_IN_REQUEST, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT } from '../actions/types';
import Cookies from 'js-cookie';

const INITIAL_AUTH_STATE = { 
  signIn: Cookies.get('isLogin') ? true : false,
  loading: false
}

/**
 * This authReducer will handle all auth-related actions, i.e. AUTH_SIGN_IN and AUTH_SIGN_OUT.
 *
 * @param state the state initialized with an object with an authData property set to null.
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updated state.
 */
const authReducer = (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case AUTH_SIGN_IN_SUCCESS:
      return { loading: false, signIn: true };
    case AUTH_SIGN_OUT:
      return INITIAL_AUTH_STATE
    default:
      return state;
  }
};

export default authReducer;
