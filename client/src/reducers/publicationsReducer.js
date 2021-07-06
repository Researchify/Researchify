import { GET_PUBLICATIONS_BY_TEAM_ID, CREATE_PUBLICATION, UPDATE_PUBLICATION, DELETE_PUBLICATION } from '../actions/types';

const publicationsReducer = (teamPublications = [], action) => {
    switch (action.type) {
        case GET_PUBLICATIONS_BY_TEAM_ID:           
            return action.payload
        case CREATE_PUBLICATION:
            return [...teamPublications, action.payload]
        case UPDATE_PUBLICATION:
            return teamPublications.map(pub => pub._id === action.payload._id ? action.payload : pub)
        case DELETE_PUBLICATION:
            return teamPublications.filter(pub => pub._id !== action.payload)
        default:
            return teamPublications
    }
};

export default publicationsReducer;