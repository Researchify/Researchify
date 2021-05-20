import { GET_PUBLICATIONS_BY_TEAM_ID, CREATE_PUBLICATION, UPDATE_PUBLICATION, DELETE_PUBLICATION, SORT_PUBLICATIONS } from '../actions/types';

const initialState = {
    loading: true,
    teamPublications: []
}

const publicationsReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_PUBLICATIONS_BY_TEAM_ID:           
            return {loading: false, teamPublications: action.payload}
        case CREATE_PUBLICATION:
            return {...state, teamPublications: [...state.teamPublications, action.payload]}
        case UPDATE_PUBLICATION:
            return {...state, teamPublications: state.teamPublications.map(pub => pub._id === action.payload._id ? action.payload : pub)}
        case DELETE_PUBLICATION:
            return {...state, teamPublications: state.teamPublications.filter(pub => pub._id !== action.payload)}
        case SORT_PUBLICATIONS:
            return {...state, teamPublications: action.payload}
        case "CREATE_BULK_PUBLICATIONS":
            let updatedTeamPubs = state.teamPublications.concat(action.payload)
            return {...state, teamPublications: updatedTeamPubs}
        default:
            return state
    }
};

export default publicationsReducer;