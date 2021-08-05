/**
 * This file exports our auth reducer that will handle all dispatched auth-related actions.
 */
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAIL, SIGN_OUT } from '../actions/types';
import Cookies from 'js-cookie';

const INITIAL_AUTH_STATE = { 
  signIn: Cookies.get('isLogin') ? true : false,
  loading: false,
  isRegistrated: null,
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
    case SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, loading: false, signIn: true };
    case SIGN_IN_FAIL: 
      return { ...state, loading: false };
    case SIGN_OUT:
      return { ...state, loading: false, signIn: false };
    case 'registrate_success':
      return { ...state, isRegistrated: true};
    default:
      return state;
  }
};

export default authReducer;
