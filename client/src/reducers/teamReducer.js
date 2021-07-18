/**
 * This file exports our team reducer that will handle all dispatched team-related actions.
 */
import {
  FETCH_TEAM_INFO,
  LINK_TEAM_TWITTER,
  UNLINK_TEAM_TWITTER,
  ADD_TEAM
} from '../actions/types';

const INITIAL_TEAM_STATE = {
  teamId: '', // todo: change to empty str when integrating
  teamName: '',
  orgName: '',
  email: '',
  twitterHandle: '',
  repoCreated: false,
};

/**
 * This teamReducer will handle all dispatched team-related actions, i.e. FETCH_TEAM_INFO, LINK_TEAM_TWITTER, and UNLINK_TEAM_TWITTER.
 *
 * @param state the state for a team in our application, initialized to INITIAL_TEAM_STATE.
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updated state.
 */
const teamReducer = (state = INITIAL_TEAM_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_TEAM_INFO:
      return { ...state, 
        teamId: payload.teamId, 
        email: payload.email,
        teamName: payload.teamName, 
        orgName: payload.orgName
      };
    case LINK_TEAM_TWITTER:
      return { ...state, twitterHandle: payload };
    case UNLINK_TEAM_TWITTER:
      return { ...state, twitterHandle: payload };
    case ADD_TEAM:
      return payload;
    default:
      return state;
  }
};

export default teamReducer;
