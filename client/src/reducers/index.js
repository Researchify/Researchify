/**
 * This index file will export combined reducers.
 */
import {combineReducers} from 'redux';

import authReducer from "./authReducer";
import publicationsReducer from './publicationsReducer'
import userReducer from "./usersReducer";


export default combineReducers({
    auth: authReducer,
    publications: publicationsReducer,
    user: userReducer
});
