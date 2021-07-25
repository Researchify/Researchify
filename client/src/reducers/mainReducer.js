import { CLEAR_ERROR, RESEARCHIFY_API_ERROR } from '../actions/types';

import { errorReducer } from '../error/errorReduxFunctions';

const INITIAL_TEAM_STATE = {
  error: null,
};

const mainReducer = (state = INITIAL_TEAM_STATE, action) => {
  switch (action.type) {
    case RESEARCHIFY_API_ERROR:
      return {
        ...errorReducer(state, action),
      };
    case CLEAR_ERROR:
      return {...state, error: null }
    default:
      return state;
  }
};
export default mainReducer;
