import { GET_PUBLICATION_BY_ID, GET_PUBLICATIONS_BY_TEAM_ID, CREATE_PUBLICATION, UPDATE_PUBLICATION, DELETE_PUBLICATION } from '../actions/types';

const initialState = {
    currentPublication: null,
    teamPublications: []
}

const publicationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PUBLICATION_BY_ID:
            return {...state,  currentPublication: action.payload }
        case GET_PUBLICATIONS_BY_TEAM_ID:           
            return {currentPublication: null,  teamPublications: action.payload }
        case CREATE_PUBLICATION:
            return {...state, teamPublications: [...state.teamPublications, action.payload]}
        case UPDATE_PUBLICATION:
            return {currentPublication: action.payload, teamPublications: state.teamPublications.map(pub => pub._id === action.payload._id ? action.payload : pub)}
        case DELETE_PUBLICATION:
            return {...state, teamPublications: state.teamPublications.filter(pub => pub._id !== action.payload)}
        default:
            return state
    }
  };

  export default publicationsReducer;