/**
 * This file exports homepage reducer that will handle all dispatched client-homepage-related actions.
 */
import { FETCH_HOMEPAGE, UPDATE_HOMEPAGE, RESET_TEAM_DATA } from '../actions/types';

// Variable in homepage (only `aboutUs` for now) is storing a (HTML) string.
// This string will get rendered in the editor automatically and scholly base when deployed.
const INITIAL_HOMEPAGE_STATE = {
  aboutUs: '',
};

const homepageReducer = (state = INITIAL_HOMEPAGE_STATE, action) => {
  switch (action.type) {
    case FETCH_HOMEPAGE:
      return { ...state, aboutUs: action.payload.aboutUs };
    case UPDATE_HOMEPAGE:
      return action.payload;
    case RESET_TEAM_DATA:
      return INITIAL_HOMEPAGE_STATE;
    default:
      return state;
  }
};

export default homepageReducer;
