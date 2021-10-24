/**
 * This file uses the custom axios client and defines the possible requests that can be made.
 */
import api from './api';

// Publication endpoints.
export const fetchPublicationsByTeamId = (teamId) => api.get(`/publications/team/${teamId}`);
export const createPublication = (newPublication) => api.post('/publications/', newPublication);
export const updatePublication = (id, updatedPublication) => api.patch(`/publications/${id}`, updatedPublication);
export const deletePublication = (id) => api.delete(`/publications/${id}`);
export const createBulkPublications = (teamId, publicationList) => api.post(`/publications/import/${teamId}`, publicationList);
export const importPublications = (authorId, startFrom, teamId) => api.get(`/publications/import/${authorId}/${startFrom}/validate/${teamId}`);
export const deleteBatchPublications = (publicationIdList) => api.patch('/publications/', publicationIdList);

// Team endpoints.
export const createTeam = (teamInfo) => api.post('/team', teamInfo);
export const fetchTeamInfo = (teamId) => api.get(`/team/${teamId}`);
export const updateTeam = (teamId, updatedTeam) => api.patch(`/team/${teamId}`, updatedTeam);
export const resetTeamData = (teamId) => api.delete(`/team/${teamId}/data-reset`);
export const deleteTeam = (teamId) => api.delete(`/team/${teamId}`);
export const createTeamMember = (teamId, newTeamMember) => api.post(`/team/${teamId}/members`, newTeamMember);
export const fetchTeamMembersByTeamId = (teamId) => api.get(`/team/${teamId}/members`);
export const updateTeamMember = (teamId, memberId, updatedTeamMember) => api.patch(`/team/${teamId}/members/${memberId}`, updatedTeamMember);
export const deleteTeamMember = (teamId, memberId) => api.delete(`/team/${teamId}/members/${memberId}`);
export const deleteBatchTeamMembers = (teamId, teamMemberIdList) => api.patch(`/team/${teamId}/members`, teamMemberIdList);
export const registerTwitterHandle = (teamId, handle) => api.patch(`/team/${teamId}/twitter-handle`, handle);
export const deregisterTwitterHandle = (teamId, emptyHandle) => api.patch(`/team/${teamId}/twitter-handle`, emptyHandle);
export const updatePassword = (teamId, updatedTeam) => api.patch(`/team/${teamId}/password-reset`, updatedTeam);
export const getTeamJWT = () => api.get('/team'); // TODO: handle duplicate fetchTeamInfo(), which is unused.
export const getGHAccessToken = (teamId, code) => api.get(`/team/${teamId}/gh_auth/${code}`);
export const deployToGHPages = (teamId, body) => api.post(`/team/${teamId}/pages-deploy`, body);
export const deleteGHPages = (teamId, body) => api.delete(`/team/${teamId}/pages-clear`, { data: body });

// Theme endpoints.
export const findOrCreateTheme = (themeData) => api.post('/theme', themeData);

// Website endpoints.
export const addWebPage = (teamId, pageName) => api.post(`/clientWebsite/${teamId}/add_page`, pageName);
export const getWebsiteInfo = (teamId) => api.get(`/clientWebsite/${teamId}`);
export const deleteWebPage = (teamId, pageName) => api.post(`/clientWebsite/${teamId}/delete_page`, pageName);
export const updateClientWebMetadata = (teamId, changes) => api.patch(`/clientWebsite/${teamId}`, changes);

// Achievement endpoints.
export const fetchAchievementsByTeamId = (teamId) => api.get(`/achievements/team/${teamId}`);
export const createAchievement = (newAchievement) => api.post('/achievements/', newAchievement);
export const updateAchievement = (id, updatedAchievement) => api.patch(`/achievements/${id}`, updatedAchievement);
export const deleteAchievement = (id) => api.delete(`/achievements/${id}`);
export const deleteBatchAchievements = (achievementIdList) => api.patch('/achievements/', achievementIdList);

// Auth endpoints.
export const loginTeam = (teamCredentials) => api.post('/auth/login', teamCredentials);
export const logoutTeam = () => api.post('/auth/logout');

// Client Homepage endpoints.
export const getHomepage = (teamId) => api.get(`/homepage/${teamId}`);
export const createOrUpdateHomepage = (teamId, homepageData) => api.post(`/homepage/${teamId}`, homepageData);
