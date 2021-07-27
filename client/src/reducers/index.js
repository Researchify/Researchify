/**
 * This index file will export combined reducers.
 */
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import publicationsReducer from './publicationsReducer';
import teamReducer from './teamReducer';
import importedPublicationsReducer from './importedPublicationsReducer';
import teamMembersReducer from './teamMembersReducer';
import mainReducer from './mainReducer';
import websiteReducer from './websiteReducer';

export default combineReducers({
  main: mainReducer,
  auth: authReducer, // do we need this?
  publications: publicationsReducer,
  team: teamReducer,
  importedPublications: importedPublicationsReducer,
  teamMember: teamMembersReducer,
  website: websiteReducer,
});
