/**
 * This file exports our team reducer that will handle all dispatched team-related actions.
 */
import {
  FETCH_TEAM_INFO,
  LINK_TEAM_TWITTER,
  UNLINK_TEAM_TWITTER,
  GET_GH_ACCESS_TOKEN,
  UPDATE_TEAM,
  TEAM_ERROR,
  FETCH_TWITTER_INFO,
} from '../actions/types';

import { errorReducer } from '../notification/notificationReduxFunctions';

const INITIAL_TEAM_STATE = {
  teamId: '', // todo: change to empty str when integrating
  teamName: '',
  orgName: '',
  email: '',
  twitterHandle: '',
  themeId: '',
  repoCreated: false,
  error: null,
};

/**
 * This teamReducer will handle all dispatched team-related actions, i.e. FETCH_TEAM_INFO, LINK_TEAM_TWITTER, and UNLINK_TEAM_TWITTER.
 *
 * @param state the state for a team in our application, initialized to INITIAL_TEAM_STATE.
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updated state.
 */
const teamReducer = (state = INITIAL_TEAM_STATE, action) => {
  switch (action.type) {
    case FETCH_TEAM_INFO:
      return {
        ...state,
        teamId: action.payload._id,
        email: action.payload.email,
        teamName: action.payload.teamName,
        orgName: action.payload.orgName,
        twitterHandle: action.payload.twitterHandle,
      };
    case FETCH_TWITTER_INFO:
      return { ...state, twitterFetchLoading: true };
    case LINK_TEAM_TWITTER:
      return {
        ...state,
        twitterHandle: action.payload,
      };
    case UNLINK_TEAM_TWITTER:
      return { ...state, twitterHandle: action.payload };
    case GET_GH_ACCESS_TOKEN:
      return { ...state, retrievedAccessToken: true };
    case UPDATE_TEAM:
      return action.payload;
    case TEAM_ERROR:
      return {
        ...errorReducer(state, action),
      };
    default:
      return state;
  }
};

export default teamReducer;
