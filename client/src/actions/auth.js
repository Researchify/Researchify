/**
 * This file houses our auth-related Action Creators.
 */
import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from './types';

/**
 * This action creator will be called when a user signs in.
 *
 * @param authData data associated to the authentication response.
 * @returns an action of type AUTH_SIGN_IN with the payload as the authData.
 */
export const signIn = (authData) => {
  return {
    type: AUTH_SIGN_IN,
    payload: authData,
  };
};

/**
 * This action creator will be called when a user signs out.
 * @returns an action of type AUTH_SIGN_OUT.
 */
export const signOut = () => {
  return {
    type: AUTH_SIGN_OUT,
  };
};
