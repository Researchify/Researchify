/**
 * This file exports homepage reducer that will handle all dispatched client-homepage-related actions.
 */
import { FETCH_HOMEPAGE, UPDATE_HOMEPAGE } from '../actions/types';

const INITIAL_HOMEPAGE_STATE = {
  aboutUs: [''],
};

const homepageReducer = (state = INITIAL_HOMEPAGE_STATE, action) => {
  switch (action.type) {
    case FETCH_HOMEPAGE:
      return { ...state, aboutUs: action.payload.aboutUs };
    case UPDATE_HOMEPAGE:
      return action.payload;
    default:
      return state;
  }
};

export default homepageReducer;
