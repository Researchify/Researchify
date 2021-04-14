/**
 * This file exports our user reducer that will handle all dispatched user data related actions.
 */
import {ADD_USER_DATA} from "../actions/types";


const INITIAL_STATE = {userProfile: {email: '', givenName: '', familyName: '', password: ''}};

/**
 * This userReducer will handle all user data-related actions.
 *
 * @param state the initial state
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updates state.
 */
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USER_DATA:
            console.log(`In reducer, payload is ${action.payload}`);
            return {userProfile: action.payload};
        default:
            return state;
    }
};

export default userReducer;