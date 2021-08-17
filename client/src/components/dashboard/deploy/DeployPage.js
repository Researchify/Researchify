import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { githubLoginUrl } from '../../../config/deploy';
import { GoMarkGithub } from 'react-icons/go';
import { deployToGHPages, getGHAccessToken } from '../../../actions/team';
import { Button, Spinner } from 'react-bootstrap';

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

  useEffect(() => {
    // github returns a code in the url after user logs in
    const url = window.location.href;
    const hasCode = url.includes('?code=');
    if (hasCode && !retrievedAccessToken && teamId) {
      const code = url.split('?code=')[1];
      // we use this code to exchange an access token
      dispatch(getGHAccessToken(teamId, code));
    } else if (!retrievedAccessToken) {
      // we refreshed so we should clear local storage
      localStorage.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, teamId]);

  const GitHubLoginButton = (
    <Button
      className="float-right"
      variant="outline-primary"
      href={githubLoginUrl}
    >
      <GoMarkGithub className="mr-2" />
      Login with Github
    </Button>
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
    <>
      Deploy Website with GitHub
      {loading ? (
        <div className="mb-3 mt-3 text-center">
          <Spinner animation="border" />
        </div>
      ) : retrievedAccessToken ? (
        DeployButton
      ) : (
        GitHubLoginButton
      )}
    </>
  );
};

export default DeployPage;
