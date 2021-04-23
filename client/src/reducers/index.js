/**
 * This index file will export combined reducers.
 */
import {combineReducers} from 'redux';

import authReducer from "./authReducer";
import fooReducer from "./fooReducer";
import publicationsReducer from './publicationsReducer'


export default combineReducers({
    auth: authReducer,
    foo: fooReducer,
    publications: publicationsReducer
});
