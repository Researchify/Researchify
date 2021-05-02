/**
 * This file houses our team-related Action Creators.
 */
import {LINK_TEAM_TWITTER, UNLINK_TEAM_TWITTER, FETCH_TEAM_INFO} from './types';
import * as api from '../api';


/**
 * This action creator will be called to populate a signed-in-user's team information.
 *
 * @note: this should be invoked just after a user has signed in as components such as the TwitterPanel
 * depend on the team information being populated.
 *
 * @note: this function returns a fake for now for the purposes of testing twitter integration.
 *
 * @param teamId id of the team for which to get team information.
 * @returns a thunk responsible for getting team information from the api and dispatching a FETCH_TEAM_INFO action
 */
export const getTeamInfo = (teamId) => async dispatch => {
    try {
        // todo: const {data} = api.fetchTeamInfo(teamId);
        const {data} = {
            data: {
                teamId: teamId,
                twitterHandle: ''
            }
        };

        dispatch({
            type: FETCH_TEAM_INFO,
            payload: data
        });
    } catch (err) {
        console.error(err);
    }
}

/**
 * This action creator will be called when a researcher links their twitter account for their research team to
 * show tweets.
 *
 * @param teamId id of the team to which the handle is to be associated.
 * @param handle the twitter handle the researcher wishes to associate with their site.
 * @returns a thunk responsible for posting the handle to the api and dispatching a LINK_TEAM_TWITTER action
 */
export const linkTwitter = (teamId, handle) => async dispatch => {
    try {
        // todo: const {data} = await api.registerTwitterHandle(teamId, {twitterHandle: handle});
        const {data} = {
            data: handle
        };

        dispatch({
            type: LINK_TEAM_TWITTER,
            payload: data
        });
    } catch (err) {
        console.log(err);
        dispatch({  // if linking unsuccessful, set payload to empty string and dispatch
            type: LINK_TEAM_TWITTER,
            payload: null
        });
    }
};

/**
 * This action creator will be called when a researcher de-registers a previously-linked twitter handle for their team.
 *
 * @param teamId id of the team to which the handle is to be disassociated.
 * @returns a thunk responsible for posting the handle to the api and dispatching an UNLINK_TEAM_TWITTER action.
 */
export const unlinkTwitter = (teamId) => async dispatch => {
    try {
        // todo: const {data} = await api.deregisterTwitterHandle(teamId, {twitterHandle: ''});
        const {data} = {
            data: ''
        };

        dispatch({
            type: UNLINK_TEAM_TWITTER,
            payload: data
        });
    } catch (err) {
        console.log(err);
    }
}
