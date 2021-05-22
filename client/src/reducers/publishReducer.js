/**
 * This file exports our publish reducer that will handle all dispatched publish-related actions.
 */
import {GH_PUBLISH_FAIL, GH_PUBLISH_SUCCESS} from "../actions/types";


const INITIAL_AUTH_STATE = {publishSucceededStatus: null};

/**
 * This publishReducer will handle all auth-related actions, i.e. AUTH_SIGN_IN and AUTH_SIGN_OUT.
 *
 * @param state the state initialized with an object with an publishSucceededStatus property set to null.
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updated state.
 */
const publishReducer = (state = INITIAL_AUTH_STATE, action) => {
    switch (action.type) {
        case GH_PUBLISH_SUCCESS:
            return {publishSucceededStatus: true};
        case GH_PUBLISH_FAIL:
            return {publishSucceededStatus: false};
        default:
            return state;
    }
};

export default publishReducer;