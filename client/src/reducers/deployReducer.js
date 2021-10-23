/**
 * This file exports website reducer that will handle all dispatched deploy-related actions.
 */
import {
  DEPLOY_SUCCESS, DEPLOY_FAIL, DEPLOY_REQUEST, RESET_TEAM_DATA,
} from '../actions/types';

const INITIAL_DEPLOY_STATE = { loading: false };

const deployReducer = (state = INITIAL_DEPLOY_STATE, action) => {
  switch (action.type) {
    case DEPLOY_REQUEST:
      return { loading: true };
    case DEPLOY_SUCCESS:
      return { loading: false };
    case DEPLOY_FAIL:
      return { loading: false };
    case RESET_TEAM_DATA:
      return INITIAL_DEPLOY_STATE;
    default:
      return state;
  }
};

export default deployReducer;
