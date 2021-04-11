/**
 * This file houses our foo action creators.
 */
import * as api from '../api';
import {FETCH_FOOS} from './types';


/**
 * This action creator will be called to fetch a list of foos.
 * @returns a thunk responsible for making the request.
 */
export const getFoos = () => async dispatch => {
    try {
        const {data} = await api.fetchFoos();
        dispatch({type: FETCH_FOOS, payload: data});
    } catch (err) {
        console.error(err);
    }
};