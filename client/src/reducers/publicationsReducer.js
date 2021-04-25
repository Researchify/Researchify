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
        // case CREATE_PUBLICATION:
        //     state.current_publication = [...state.team_publications, action.payload]
        //     return state
        case UPDATE_PUBLICATION:
            return {currentPublication: action.payload, teamPublications: state.teamPublications.map(pub => pub._id === action.payload._id ? action.payload : pub)}
        // case DELETE_PUBLICATION:
        //     let updated_team_publications = state.team_publications.filter((pub) => 
        //     pub.id !== action.payload)
        //     state.team_publications = updated_team_publications
        default:
            return state
    }
  };

  export default publicationsReducer;