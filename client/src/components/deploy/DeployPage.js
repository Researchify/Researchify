import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { githubLoginUrl } from '../../config/deploy';
import { GoMarkGithub } from 'react-icons/go';
import { deployToGHPages, getGHAccessToken } from '../../actions/team';
import { Button } from 'react-bootstrap';

const DeployPage = () => {
  const dispatch = useDispatch();
  // const teamId = useSelector((state) => state.team.teamId);
  // FIXME: this is hardcoded because redirect from github loses team info after the redirect
  // this issue should be fixed once authorization and jwt is implemented
  const teamId = '60e92f81eaefdcaaa3ac724c';
  const retrievedAccessToken = useSelector(
    (state) => state.team.retrievedAccessToken
  );
  const linkedHandle = useSelector((state) => state.team.twitterHandle);

  useEffect(() => {
    // github returns a code in the url after user logs in
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode && !retrievedAccessToken) {
      const code = url.split('?code=')[1];
      // we use this code to exchange an access token
      dispatch(getGHAccessToken(teamId, code));
    } else if (!retrievedAccessToken) {
      // we refreshed so we should clear local storage
      localStorage.clear();
    }
  }, [dispatch]);

  const GitHubLoginButton = () => (
    <Button
      variant="outline-primary"
      href={githubLoginUrl}
      disabled={retrievedAccessToken}
    >
      <GoMarkGithub />
      Login with Github
    </Button>
  );

  const handleDeploy = () => {
    const accessToken = localStorage.getItem('GH_access_token');
    // call backend endpoint to deploy and give the access token
    dispatch(deployToGHPages(teamId, accessToken, linkedHandle));
  };

  const DeployButton = () => (
    <span>
      <Button
        variant="primary"
        size="lg"
        disabled={!retrievedAccessToken}
        onClick={handleDeploy}
      >
        Deploy to GitHub Pages
      </Button>
    </span>
  );

  return (
    <>
      <GitHubLoginButton />
      <DeployButton />{' '}
    </>
  );
};

export default DeployPage;