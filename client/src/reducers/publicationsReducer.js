import {
  GET_PUBLICATIONS_BY_TEAM_ID,
  CREATE_PUBLICATION,
  UPDATE_PUBLICATION,
  DELETE_PUBLICATION,
  CREATE_BULK_PUBLICATIONS,
} from '../actions/types';

const initialState = {
  loading: true,
  teamPublications: [],
  checkedPublications: [],
};

const publicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PUBLICATIONS_BY_TEAM_ID:
      return { ...state, loading: false, teamPublications: action.payload };
    case CREATE_PUBLICATION:
      return {
        ...state,
        teamPublications: [...state.teamPublications, action.payload],
      };
    case UPDATE_PUBLICATION:
      return {
        ...state,
        teamPublications: state.teamPublications.map((pub) => (pub._id === action.payload._id ? action.payload : pub)),
      };
    case DELETE_PUBLICATION:
      return {
        ...state,
        teamPublications: state.teamPublications.filter(
          (pub) => pub._id !== action.payload,
        ),
      };
    case CREATE_BULK_PUBLICATIONS:
      return { ...state, teamPublications: state.teamPublications.concat(action.payload) };
    case 'CHECK_PUBLICATIONS':
      return { ...state, checkedPublications: state.checkedPublications.concat(action.payload) };
    case 'UNCHECK_PUBLICATION': {
      const unchecks = action.payload;
      return { ...state, checkedPublications: state.checkedPublications.filter((checkedPub) => !unchecks.find((uncheck) => uncheck === checkedPub)) };
    }
    default:
      return state;
  }
};

export default publicationsReducer;
