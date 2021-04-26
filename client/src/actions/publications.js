import * as api from '../api'
import { GET_PUBLICATION_BY_ID, GET_PUBLICATIONS_BY_TEAM_ID, CREATE_PUBLICATION, UPDATE_PUBLICATION, DELETE_PUBLICATION } from './types';

// obsolete 
export const getPublicationById = (id) => async(dispatch) => {
    try{
        const { data } = await api.fetchPublicationById(id);

        dispatch({
            type: GET_PUBLICATION_BY_ID,
            payload: data
        })
    }catch (error) {
        console.log(error);
    }
}

export const getPublicationsByTeamId = (teamId) => async(dispatch) => {
    try{
        const { data } = await api.fetchPublicationsByTeamId(teamId);

        dispatch({
            type: GET_PUBLICATIONS_BY_TEAM_ID,
            payload: data
        })
    }catch (error) {
        console.log(error);
    }
}


export const createPublication = (publication) => async(dispatch) => {
    try{
        const result = await api.createPublication(publication);

        console.log(result)

        dispatch({
            type: CREATE_PUBLICATION,
            payload: result.data
        })
    } catch(error){
        if(error.response){
            console.log(error.response.data)
        }
    }
}


export const updatePublication = (id, publication) => async(dispatch) => {
    try{
        const result = await api.updatePublication(id, publication);

        console.log(result)


        dispatch({
            type: UPDATE_PUBLICATION,
            payload: result.data
        })
    } catch(error){
        console.log(error)
    }
}

export const deletePublication = (id) => async dispatch => {
    try {
        await api.deletePublication(id);
        dispatch({
            type: DELETE_PUBLICATION, 
            payload: id
        });
    } catch (error) {
        console.log(error);
    }
};