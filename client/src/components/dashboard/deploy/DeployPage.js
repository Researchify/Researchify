import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { Spinner } from 'react-bootstrap';
import GitHubLogin from 'react-github-login';
import toast from 'react-hot-toast';

import { githubClientId, scope } from '../../../config/deploy';
import { getGHAccessToken } from '../../../actions/team';

import './DeployPage.css';
import DeployForm from './form/DeployForm';

const DeployPage = ({ teamId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deploy.loading);

  const retrievedAccessToken = useSelector(
    (state) => state.team.retrievedAccessToken,
  );

  const onSuccessfulLogin = (response) => {
    const { code } = response;
    // Now that we have the temporary code, we wish to exchange it for a GitHub
    // access token. This action will fetch the token and push it to localstorage.
    dispatch(getGHAccessToken(teamId, code));
  };

  // handle error toast when fail to log in
  // usually is when user close the login window
  const onLoginFail = () => {
    toast.error('You must login with GitHub to deploy');
  };

  const GitHubLoginButton = (
    <GitHubLogin
      className="float-right github-login-button"
      clientId={githubClientId}
      scope={scope}
      onSuccess={onSuccessfulLogin}
      onFailure={onLoginFail}
      redirectUri=""
    >
      <GoMarkGithub className="mr-2" />
      Login with GitHub
    </GitHubLogin>
  );

  return (
    <>
      Deploy Website with GitHub
      {loading ? (
        <div className="mb-3 mt-3 text-center">
          <Spinner animation="border" />
        </div>
      ) : retrievedAccessToken ? (
        <DeployForm teamId={teamId} />
      ) : (
        GitHubLoginButton
      )}
    </>
  );
};

export default DeployPage;
