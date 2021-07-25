/**
 * This file exports website reducer that will handle all dispatched website-related actions.
 */
 import {CREATE_WEBSITE, DELETE_WEBSITE} from "../actions/types";


 const INITIAL_WEBSITE_STATE = {isCreated: false};
 
 /**
  * Handle all website-related actions
  */
 const websiteReducer = (state = INITIAL_WEBSITE_STATE, action) => {
     switch (action.type) {
         case CREATE_WEBSITE:
             return {isCreated: true};
         case DELETE_WEBSITE:
             return {isCreated: false};
         default:
             return state;
     }
 };
 
 export default websiteReducer;