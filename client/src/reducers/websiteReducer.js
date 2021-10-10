/**
 * This file exports our team reducer that will handle all dispatched team-related actions.
 */
import {
  CREATE_WEBSITE,
  ADD_WEBPAGE,
  DELETE_WEBPAGE,
  FETCH_WEBSITE_INFO,
  UPDATE_PUBLICATION_OPTIONS,
  RESET_WEBPAGE,
  UPDATE_WEBSITE_TITLE,
  UPDATE_WEBSITE_TEMPLATE,
} from '../actions/types';

const INITIAL_WEBSITE_STATE = {
  url: '',
  title: '',
  pages: [],
  publicationOptions: {},
  template: { layout: '1', theme: 'light' },
};

/**
 * This websiteReducer will handle all dispatched client website-related actions, i.e. CREATE_WEBSITE and ADD_WEBPAGE.
 *
 * @param state the state for a client website in our application, initialized to INITIAL_WEBSITE_STATE.
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updated state.
 */
const websiteReducer = (state = INITIAL_WEBSITE_STATE, { payload, type }) => {
  switch (type) {
    case CREATE_WEBSITE:
      return { ...state, url: payload.url, title: payload.title };
    case ADD_WEBPAGE:
      return { ...state, pages: state.pages.concat(payload) };
    case DELETE_WEBPAGE:
      return {
        ...state,
        pages: state.pages.filter((page) => page !== payload),
      };
    case FETCH_WEBSITE_INFO:
      return {
        ...state,
        loading: false,
        url: payload.url ?? state.url,
        title: payload.title ?? state.title,
        pages: payload.pages ?? state.pages,
        publicationOptions: payload.publicationOptions ?? state.publicationOptions,
        template: payload.template ?? state.template,
      };
    case UPDATE_PUBLICATION_OPTIONS:
      return { ...state, publicationOptions: payload };
    case RESET_WEBPAGE:
      return INITIAL_WEBSITE_STATE;
    case UPDATE_WEBSITE_TITLE:
      return { ...state, title: payload };
    case UPDATE_WEBSITE_TEMPLATE:
      return { ...state, template: payload };
    default:
      return state;
  }
};

export default websiteReducer;
