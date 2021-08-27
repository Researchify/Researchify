/**
 * This file exports achievements reducer that will handle all dispatched achievement-related actions.
 */
import {
    GET_ACHIEVEMENTS_BY_TEAM_ID,
    CREATE_ACHIEVEMENT,
    UPDATE_ACHIEVEMENT,
    DELETE_ACHIEVEMENT,
  } from '../actions/types';

const initialState = {
    loading: true,
    achievements: [],
  };

const achievementsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACHIEVEMENTS_BY_TEAM_ID:
          return { loading: false, achievements: action.payload };
        case CREATE_ACHIEVEMENT:
          return { ...state, achievements: [...state.achievements, action.payload] };
        case UPDATE_ACHIEVEMENT:
          return {
            ...state,
            achievements: state.achievements.map((achievement) =>
            achievement._id === action.payload._id ? action.payload : achievement
            ),
          };
        case DELETE_ACHIEVEMENT:
          return {
            ...state,
            achievements: state.achievements.filter(
              (achievement) => achievement._id !== action.payload
            ),
          };
        default:
          return state;
    }
};

export default achievementsReducer;
