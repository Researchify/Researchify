import * as api from '../api'
import { 
    GET_TEAM_MERMBERS_BY_TEAM_ID, 
    CREATE_TEAM_MEMBER, 
    UPDATE_TEAM_MEMBER, 
    DELETE_TEAM_MEMBER
} from './types'

export const getTeamMembersByTeamId = (teamId) => async(dispatch) => {
    try{
        const { data } = await api.fetchTeamMembersByTeamId(teamId);

        dispatch({
            type: GET_TEAM_MERMBERS_BY_TEAM_ID,
            payload: data
        })
    }catch (error) {
        console.log(error);
    }
}

export const createTeamMember = (publication) => async(dispatch) => {
    try{
        const { data } = await api.createTeamMember(publication);

        dispatch({
            type: CREATE_TEAM_MEMBER,
            payload: data
        })
    } catch(error){
        console.log(error);
    }
}

export const updateTeamMember = (id, publication) => async(dispatch) => {
    try{
        const { data } = await api.updateTeamMember(id, publication);
        
        dispatch({
            type: UPDATE_TEAM_MEMBER,
            payload: data
        })
    } catch(error){
        console.log(error)
    }
}

export const deleteTeamMember = (id) => async dispatch => {
    try {
        await api.deleteTeamMember(id);
        dispatch({
            type: DELETE_TEAM_MEMBER, 
            payload: id
        });
    } catch (error) {
        console.log(error);
    }
};