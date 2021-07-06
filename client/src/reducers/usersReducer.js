/**
 * This file exports our user reducer that will handle all dispatched user data related actions.
 */
import { ADD_USER_DATA, FETCH_USER_DATA } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  givenName: '',
  familyName: '',
  password: '',
  teamId: '',
};

/**
 * This userReducer will handle all user data-related actions.
 *
 * @param state the initial state
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns object representing the new state.
 */
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return action.payload;
    case ADD_USER_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
