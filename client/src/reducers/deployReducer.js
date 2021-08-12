/**
 * This file exports website reducer that will handle all dispatched deploy-related actions.
 */
 import {DEPLOY_SUCCESS, DEPLOY_FAIL, DEPLOY_REQUEST} from "../actions/types";

 const INITIAL_DEPLOY_STATE = {loading: false};
 
 const deployReducer = (state = INITIAL_DEPLOY_STATE, action) => {
     switch (action.type) {
         case DEPLOY_REQUEST:
             return {loading: true};
         case DEPLOY_SUCCESS:
             return {loading: false};
        case DEPLOY_FAIL:
             return {loading: false};
         default:
             return state;
     }
 };
 
 export default deployReducer;