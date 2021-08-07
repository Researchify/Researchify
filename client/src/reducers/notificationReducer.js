/**
 * This file exports our notification reducer that will handle all dispatched notification-related actions.
 */
import { CLEAR_NOTIFICATION, RESEARCHIFY_API_ERROR, SUCCESS_MESSAGE } from '../actions/types';

import { errorReducer } from '../notification/notificationReduxFunctions';

const INITIAL_NOTIFICATION_STATE = {
  error: null,
  success: null,
};

const notificationReducer = (state = INITIAL_NOTIFICATION_STATE, action) => {
  switch (action.type) {
    case RESEARCHIFY_API_ERROR:
      return {
        ...errorReducer(state, action),
      };
    case CLEAR_NOTIFICATION:
      return INITIAL_NOTIFICATION_STATE
    case SUCCESS_MESSAGE:
      return {...state, success: action.payload }
    default:
      return state;
  }
};
export default notificationReducer;