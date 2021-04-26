/**
 * This file uses the custom axios client and defines the possible requests that can be made.
 */
import fooApi from './fooApi';
import api from './api';

/**
 * Posts the user data (email, given and family name and password) to api at endpoint '/'
 * @param {*} payload object containing email, givenName, familyName and password of the user
 */
export const addUserData = (payload) => api.post("/users", payload);

export const fetchFoos = () => fooApi.get('/foo');

export const fetchPublicationById = (id) => api.get(`/publications/${id}`);
export const fetchPublicationsByTeamId = (teamId) => api.get(`/publications/team/${teamId}`);
export const createPublication = (newPublication) => {
    console.log(newPublication)
    api.post("/publications", newPublication)}
export const updatePublication = (id, updatedPublication) => api.patch(`/publications/${id}`, updatedPublication);
export const deletePublication = (id) => api.delete(`/publications/${id}`);
