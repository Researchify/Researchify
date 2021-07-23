/**
 * This file uses the custom axios client and defines the possible requests that can be made.
 */
import api from './api';

/**
 * Posts the user data (email, given and family name and password) to api at endpoint '/'
 * @param {*} payload object containing email, givenName, familyName and password of the user
 */
export const fetchPublicationsByTeamId = (teamId) =>
  api.get(`/publications/team/${teamId}`);

export const createPublication = (newPublication) =>
  api.post(`/publications/`, newPublication);
export const updatePublication = (id, updatedPublication) =>
  api.patch(`/publications/${id}`, updatedPublication);
export const deletePublication = (id) => api.delete(`/publications/${id}`);
export const createBulkPublications = (teamId, publicationList) =>
  api.post(`/publications/import/${teamId}`, publicationList);
export const importPublications = (authorId, startFrom, teamId) =>
  api.get(`/publications/import/${authorId}/${startFrom}/validate/${teamId}`);

export const addTeam = (teamInfo) => api.post('/team', teamInfo);
export const fetchTeamInfo = (teamId) => api.get(`/team/${teamId}`);
export const loginTeam = (teamCredentials) =>
  api.post(`/team/login`, teamCredentials);
  export const logoutTeam = () =>
  api.post(`/team/logout`);
export const registerTwitterHandle = (teamId, handle) =>
api.patch(`/team/${teamId}/twitter-handle`, handle);
export const deregisterTwitterHandle = (teamId, emptyHandle) =>
api.patch(`/team/${teamId}/twitter-handle`, emptyHandle);
export const getTeamJWT = () => api.get(`/team`);

export const fetchTeamMembersByTeamId = (teamId) =>
api.get(`/team/${teamId}/member`);
export const createTeamMember = (teamId, newTeamMember) =>
api.post(`/team/${teamId}/member`, newTeamMember);
export const updateTeamMember = (teamId, updatedTeamMember) =>
api.patch(`/team/${teamId}/member`, updatedTeamMember);
export const deleteTeamMember = (teamId, teamMemberId) =>
  api.delete(`/team/${teamId}/member/${teamMemberId}`);
export const updateTeam = (teamId, updatedTeam) =>
  api.patch(`/team/${teamId}`, updatedTeam);

export const findOrCreateTheme = (themeData) =>
  api.post(`/theme`, themeData);
