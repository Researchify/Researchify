/**
 * This file exports our foo reducer that will handle all dispatched foo-related actions.
 */
import {FETCH_FOOS} from '../actions/types';

/**
 * This fooReducer will handle all foo-related actions, i.e. FETCH_FOOS.
 *
 * @param state the state initialized to an empty array.
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updated state.
 */
const fooReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_FOOS:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default fooReducer;