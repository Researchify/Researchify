import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { Spinner } from 'react-bootstrap';
import GitHubLogin from 'react-github-login';
import toast from 'react-hot-toast';
import { PropTypes } from 'prop-types';

import styled from 'styled-components';
import { githubClientId, scope } from '../../../config/deploy';
import { getGHAccessToken, deployToGHPages } from '../../../actions/team';
import './DeployPage.css';

import { PrimaryButton } from '../../shared/styledComponents';

const GHButton = styled(GitHubLogin)` //Purple
    padding: .375rem .75rem;
    border: 1px solid #56658a;
    border-radius: .25rem;
    background-color: #56658a;
    color: white;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: ${(props) => props.fontSize}; //.875rem;
  &:hover{
    background-color:rgb(60, 70, 96);
  }
`;

// const GHButton = styled(GitHubLogin)` //Gold
//     padding: .375rem .75rem;
//     border: 1px solid #AB9671 !important;
//     border-radius: .25rem;
//     background-color: #AB9671;
//     color: white;
//     transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//     font-size: ${(props) => props.fontSize}; //.875rem;
//   &:hover{
//     background-color: rgb(119, 105, 79);
//   }
// `;

const DeployPage = ({ teamId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deploy.loading);
  const retrievedAccessToken = useSelector(
    (state) => state.team.retrievedAccessToken,
  );

  const handleDeploy = () => {
    const accessToken = localStorage.getItem('GH_access_token');
    // call backend endpoint to deploy and give the access token
    dispatch(deployToGHPages(teamId, accessToken));
  };

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
    <GHButton
      className="float-right"
      clientId={githubClientId}
      scope={scope}
      onSuccess={onSuccessfulLogin}
      onFailure={onLoginFail}
      redirectUri=""
    >
      <GoMarkGithub className="mr-2" />
      Login with GitHub
    </GHButton>
  );

  const DeployButton = (
    <PrimaryButton
      className="float-right"
      disabled={!retrievedAccessToken}
      onClick={handleDeploy}
    >
      Deploy to GitHub Pages
    </PrimaryButton>
  );

  return (
    <>
      Deploy Website with GitHub
      { (() => {
        if (loading) {
          return (
            <div className="mb-3 mt-3 text-center">
              <Spinner animation="border" />
            </div>
          );
        } if (retrievedAccessToken) {
          return (DeployButton);
        }
        return (GitHubLoginButton);
      })()}
    </>
  );
};

// props validation
DeployPage.propTypes = {
  teamId: PropTypes.string.isRequired,
};

export default DeployPage;
