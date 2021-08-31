/**
 * This index file will export combined reducers
 * When the logout action is dispatched, all reducers will be initialzed to thir initial state
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
import { LOG_OUT } from '../actions/types';

const appReducer =  combineReducers({
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

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer