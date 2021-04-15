/**
 * This file uses the custom axios client and defines the possible requests that can be made.
 */
import fooApi from './fooApi';
import publicationsApi from './publications';


export const fetchFoos = () => fooApi.get('/foo');

export const fetchPublicationById = (id) => publicationsApi.get(`/publications/${id}`);
export const fetchPublicationsByTeamId = (teamId) => publicationsApi.get(`/publications/team/${teamId}`);
// export const createPublication = (newPulication) => publicationsApi.post(`/publications`, newPulication);
// export const updatePublication = (id, updatedPublication) => publicationsApi.patch(`/publications/${id}`, updatedPublication);
// export const deletePublication = (id) => publicationsApi.delete(`/publications/${id}`);

