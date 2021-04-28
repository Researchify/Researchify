import * as api from '../api'
import { GET_PUBLICATIONS_BY_TEAM_ID, CREATE_PUBLICATION, UPDATE_PUBLICATION, DELETE_PUBLICATION } from './types';


export const getPublicationsByTeamId = (teamId) => async(dispatch) => {
    try{
        const { data } = await api.fetchPublicationsByTeamId(teamId);

        data.map(pub => pub.authors = pub.authors.join()) // convert authors array to string 

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
        publication = {...publication, authors: publication.authors.split(',')} // convert authors string to array 

        console.log("actions", publication)

        const { data } = await api.createPublication(publication);

        console.log("actions_data", data)

        data.authors = data.authors.join() // convert authors array to string 

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
        console.log(publication)
        publication = {...publication, authors: publication.authors.split(',')} // convert authors string to array 

        console.log("###", publication)

        const { data } = await api.updatePublication(id, publication);

        data.authors = data.authors.join() // convert authors array to string 
        
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