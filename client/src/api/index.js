/**
 * This file uses the custom axios client and defines the possible requests that can be made.
 */
<<<<<<< HEAD
import fooApi from './fooApi';
import publicationsApi from './publications';
=======
import fooApi from "./fooApi";
import userApi from "./userApi";
>>>>>>> thunder

/**
 * Posts the user data (email, given and family name and password) to api at endpoint '/'
 * @param {*} payload object containing email, givenName, familyName and password of the user
 */
export const addUserData = (payload) => userApi.post("/users", payload);

export const fetchFoos = () => fooApi.get('/foo');

export const fetchPublicationById = (id) => publicationsApi.get(`/publications/${id}`);
export const fetchPublicationsByTeamId = (teamId) => publicationsApi.get(`/publications/team/${teamId}`);
// export const createPublication = (newPulication) => publicationsApi.post(`/publications`, newPulication);
// export const updatePublication = (id, updatedPublication) => publicationsApi.patch(`/publications/${id}`, updatedPublication);
// export const deletePublication = (id) => publicationsApi.delete(`/publications/${id}`);

