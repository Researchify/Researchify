/**
 * This file exports an Auth component used to display sign-ins and sign-ups.
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signIn, signOut } from '../../actions/auth';

const Auth = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.authData);

  return (
    <div>
      Auth Component.
      <br />
      <button
        onClick={() => {
          if (isSignedIn) dispatch(signOut());
          else dispatch(signIn({ tokenId: 'fakeToken' }));
        }}
      >
        {isSignedIn ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  );
};

export default Auth;
