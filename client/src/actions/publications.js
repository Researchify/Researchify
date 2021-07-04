import * as api from '../api'
import {
  GET_PUBLICATIONS_BY_TEAM_ID,
  CREATE_PUBLICATION,
  UPDATE_PUBLICATION,
  DELETE_PUBLICATION,
  SORT_PUBLICATIONS,
  CREATE_BULK_PUBLICATIONS,
  IMPORT_REQUEST,
  IMPORT_SUCCESS,
  IMPORT_FAIL,
  UPDATE_GSCHOLAR_ID,
  IMPORT_END,
} from "./types";
import { pageSize } from '../config/publications';

export const getPublicationsByTeamId = (teamId) => async(dispatch) => {
    try{
        const { data } = await api.fetchPublicationsByTeamId(teamId);

        data.map(pub => pub.yearPublished = pub.yearPublished.substring(0,4)) // only get the year from the date format

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

        result.data.yearPublished = result.data.yearPublished.substring(0,4) // only get the year from the date format

        dispatch({
            type: CREATE_PUBLICATION,
            payload: {...result.data, newlyAdded: true}
        })
    } catch(error){
        console.log(error);
    }
}

export const updatePublication = (id, publication) => async(dispatch) => {
    try{
        const { data } = await api.updatePublication(id, publication);

        data.yearPublished = data.yearPublished.substring(0,4) // only get the year from the date format
        
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

export const sortPublications = (teamPublications, sortingOption) => async(dispatch) => {
    console.log(teamPublications);
    console.log(sortingOption);
    switch (sortingOption) {
        case "Author":
            teamPublications.sort((a, b) => (a.authors[0].toLowerCase() > b.authors[0].toLowerCase()) ? 1 : -1);
            break;
        case "Title":
            // publication title
            teamPublications.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
            break;
        case "Category Title":
            // journal or conference title
            teamPublications.sort((a, b) => (a.category.categoryTitle.toLowerCase() > b.category.categoryTitle.toLowerCase()) ? 1 : -1)
            break;
        default:
            // sort by title then year for consistency with the db
            teamPublications.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
            teamPublications.sort((a, b) => (a.year > b.year) ? -1 : 1);
            break;
    }
    console.log(teamPublications);

    dispatch({
        type: SORT_PUBLICATIONS,
        payload: teamPublications
    })
}

export const importPublication = (values, startFrom) => async dispatch => {
    try{
        dispatch({
            type: IMPORT_REQUEST
        })

        // extracting the authorId from the profileLink
        let position = values.profileLink.indexOf('user=')
        if (position === -1){
            dispatch({
                type: IMPORT_FAIL,
                payload: "Please provide a valid profile link"
            })
        } else{
            const author_id = values.profileLink.substring(position + 5, position+17)
            dispatch({
                type: UPDATE_GSCHOLAR_ID,
                payload: author_id
            })
            console.log(startFrom);
            const result = await api.importPublications(author_id, startFrom)
            console.log(result);
            dispatch({
                type: IMPORT_SUCCESS,
                payload: result.data
            })

        }

    } catch(error){
        dispatch({
            type: IMPORT_FAIL,
            payload: error.response
        })
    }
}

export const retrieveMorePublications = (author_id, startFrom) => async dispatch => {
    try {
        dispatch({
            type: IMPORT_REQUEST
        })
        console.log("retrieve more");
        console.log(startFrom);
        const result = await api.importPublications(author_id, startFrom)
        console.log(result);

        if (result.data.length < pageSize) {
            // reached the end of the user's publications
            dispatch({
                type: IMPORT_END
            })
        }

        dispatch({
            type: IMPORT_SUCCESS,
            payload: result.data
        })

    } catch(error) {
        dispatch({
            type: IMPORT_FAIL,
            payload: error.response
        })
    }
}

export const createBulkPublications = (teamId, publicationList) => async dispatch => {
    try{
        const result = await api.createBulkPublications(teamId, publicationList)
        let createdPublications = result.data.map(pub => 
            ({...pub, yearPublished: pub.yearPublished.substring(0,4), newlyAdded: true})
        )

        dispatch({
            type: CREATE_BULK_PUBLICATIONS,
            payload: createdPublications
        })

    } catch(error){
        console.log(error)
    }
}