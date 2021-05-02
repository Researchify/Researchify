import * as api from '../api'
import { GET_PUBLICATIONS_BY_TEAM_ID, CREATE_PUBLICATION, UPDATE_PUBLICATION, DELETE_PUBLICATION } from './types';


export const getPublicationsByTeamId = (teamId) => async(dispatch) => {
    try{
        const { data } = await api.fetchPublicationsByTeamId(teamId);

        data.map(pub => pub.yearPublished = pub.yearPublished.substring(0,4)) // only get from year from the date format

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
        const { data } = await api.createPublication(publication);

        data.yearPublished = data.yearPublished.substring(0,4) // only get from year from the date format

        dispatch({
            type: CREATE_PUBLICATION,
            payload: data
        })
    } catch(error){
        console.log(error);
    }
}

export const updatePublication = (id, publication) => async(dispatch) => {
    try{
        const { data } = await api.updatePublication(id, publication);

        data.yearPublished = data.yearPublished.substring(0,4) // only get from year from the date format
        
        dispatch({
            type: UPDATE_PUBLICATION,
            payload: data
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