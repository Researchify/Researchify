import {
  GET_TEAM_MEMBERS_BY_TEAM_ID,
  CREATE_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
} from '../actions/types';

const initialState = {
  loading: true,
  teamMembers: [],
};

const teamMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_MEMBERS_BY_TEAM_ID:
      return { loading: false, teamMembers: action.payload };
    case CREATE_TEAM_MEMBER:
      return { ...state, teamMembers: [...state.teamMembers, action.payload] };
    case UPDATE_TEAM_MEMBER:
      return {
        ...state,
        teamMembers: state.teamMembers.map((member) => (member._id === action.payload._id ? action.payload : member)),
      };
    case DELETE_TEAM_MEMBER:
      return {
        ...state,
        teamMembers: state.teamMembers.filter(
          (member) => member._id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default teamMembersReducer;
