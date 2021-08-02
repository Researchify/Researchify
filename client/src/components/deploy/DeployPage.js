import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { githubLoginUrl } from '../../config/deploy';
import { GoMarkGithub } from 'react-icons/go';
import { deployToGHPages, getGHAccessToken } from '../../actions/team';
import { Button } from 'react-bootstrap';

const DeployPage = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const retrievedAccessToken = useSelector(
    (state) => state.team.retrievedAccessToken
  );
  const linkedHandle = useSelector((state) => state.team.twitterHandle);
  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

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
      <ConditionalWrapper
        condition={retrievedAccessToken}
        wrapper={(children) => <DeployButton> {children}</DeployButton>}
      >
        <GitHubLoginButton />
      </ConditionalWrapper>
    </>
  );
};

export default DeployPage;
