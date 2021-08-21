import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { Button, Spinner } from 'react-bootstrap';
import GitHubLogin from 'react-github-login';

import { githubClientId, scope } from '../../../config/deploy';
import { getGHAccessToken, deployToGHPages } from '../../../actions/team';
import './DeployPage.css';

const DeployPage = ({ teamId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deploy.loading);
  // TODO: refactor this into useState
  const retrievedAccessToken = useSelector(
    (state) => state.team.retrievedAccessToken
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
  }

  const onLoginFail = (response) => {
    // TODO, show a nice error.
    console.error(response);
  }

  // useEffect(() => {
  //   // github returns a code in the url after user logs in
  //   const url = window.location.href;
  //   const hasCode = url.includes('?code=');
  //   if (hasCode && !retrievedAccessToken && teamId) {
  //     const code = url.split('?code=')[1];
  //     // we use this code to exchange an access token
  //     dispatch(getGHAccessToken(teamId, code));
  //   } else if (!retrievedAccessToken) {
  //     // we refreshed so we should clear local storage
  //     localStorage.clear();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, teamId]);

  const GitHubLoginButton = (
    <GitHubLogin className="float-right github-login-button" clientId={githubClientId} scope={scope}
                 onSuccess={onSuccessfulLogin} onFailure={onLoginFail}
                 redirectUri="">
      <GoMarkGithub className="mr-2"/>
      Login GitHub to Deploy
    </GitHubLogin>
  );

  const DeployButton = (
    <Button
      className="float-right"
      variant="primary"
      // TODO: modify this condition to check currentWebPages isn't empty
      disabled={!retrievedAccessToken}
      onClick={handleDeploy}
    >
      Deploy to GitHub Pages
    </Button>
  );

  return (
    <Fragment>
      Deploy Website with GitHub
      {
        loading ?
        <div className="mb-3 mt-3 text-center">
          <Spinner animation="border" />
        </div> :
        ( retrievedAccessToken ? DeployButton : GitHubLoginButton )
      }
    </Fragment>
  );
};

export default DeployPage;
