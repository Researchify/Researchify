/**
 * This index file will export combined reducers.
 */
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import publicationsReducer from './publicationsReducer';
import teamReducer from './teamReducer';
import importedPublicationsReducer from './importedPublicationsReducer';
import teamMembersReducer from './teamMembersReducer';

export default combineReducers({
  auth: authReducer,
  publications: publicationsReducer,
  team: teamReducer,
  importedPublications: importedPublicationsReducer,
  teamMember: teamMembersReducer,
});
