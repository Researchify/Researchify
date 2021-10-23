/**
 * This index file will export our combined reducers.
 */
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import publicationsReducer from './publicationsReducer';
import teamReducer from './teamReducer';
import importedPublicationsReducer from './importedPublicationsReducer';
import teamMembersReducer from './teamMembersReducer';
import websiteReducer from './websiteReducer';
import notificationReducer from './notificationReducer';
import deployReducer from './deployReducer';
import achievementsReducer from './achievementsReducer';
import homepageReducer from './homepageReducer';
import { LOG_OUT, RESET_TEAM_DATA } from '../actions/types';

const appReducer = combineReducers({
  notification: notificationReducer,
  auth: authReducer,
  publications: publicationsReducer,
  team: teamReducer,
  importedPublications: importedPublicationsReducer,
  teamMember: teamMembersReducer,
  deploy: deployReducer,
  website: websiteReducer,
  achievements: achievementsReducer,
  homepage: homepageReducer,
});

/**
 * A root reducer wrapper over the main app reducer used to centralize the
 * resetting of state.
 * @see https://www.digitalocean.com/community/tutorials/redux-reset-state-redux
 *
 * @param state the entire state of the redux store
 * @param action the action that was dispatched
 */
const rootReducer = (state, action) => {
  // Reset state when we log out or if the user has reset their data.
  if (action.type === LOG_OUT) {
    return appReducer(undefined, action);
  }
  if (action.type === RESET_TEAM_DATA) {
    return teamReducer(state, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
