/**
 * This file houses our publish-related Action Creators.
 */
import * as api from '../api'
import {GH_PUBLISH_SUCCESS, GH_PUBLISH_FAIL} from "./types";


/**
 * This action creator will be called when publishing a user's site.
 *
 * @param teamId the id of the team to which the user belongs.
 * @param ghUsername the GitHub username of the user.
 * @param ghToken the GitHub PAT of the user.
 * @returns a thunk responsible for invoking the api to publish the site.
 */
export const publishToGitHubPages = (teamId, ghUsername, ghToken) => async dispatch => {
    try {
        await api.publishSiteToGitHubPages(teamId, {ghUsername, ghToken});
        dispatch({
            type: GH_PUBLISH_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: GH_PUBLISH_FAIL
        });
    }
}