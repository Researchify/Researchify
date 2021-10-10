import {
  GET_TEAM_MEMBERS_BY_TEAM_ID,
  CREATE_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  DELETE_BATCH_TEAM_MEMBERS,
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
    case DELETE_BATCH_TEAM_MEMBERS: {
      const deletedMembersIds = action.payload;
      return {
        ...state,
        teamMembers: state.teamMembers.filter(
          (pub) => !deletedMembersIds.find((id) => id === pub._id),
        ),
      };
    }

    default:
      return state;
  }
};

export default teamMembersReducer;
