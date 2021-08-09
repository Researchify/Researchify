/**
 * This index file will export combined reducers.
 */
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import publicationsReducer from './publicationsReducer';
import teamReducer from './teamReducer';
import importedPublicationsReducer from './importedPublicationsReducer';
import teamMembersReducer from './teamMembersReducer';
import websiteReducer from './websiteReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  notification: notificationReducer,
  auth: authReducer, 
  publications: publicationsReducer,
  team: teamReducer,
  importedPublications: importedPublicationsReducer,
  teamMember: teamMembersReducer,
  website: websiteReducer,
});
