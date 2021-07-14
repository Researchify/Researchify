import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { githubLoginUrl } from '../../config/deploy';
import { GoMarkGithub } from 'react-icons/go';
import { getGHAccessToken, deployToGHPages } from '../../actions/team';
import { Button } from 'react-bootstrap';

const DeployPage = () => {
  const dispatch = useDispatch();
  // const teamId = useSelector((state) => state.team.teamId);
  // TODO: this is hardcode because redirect from github loses team info in the state
  const teamId = '60e92f81eaefdcaaa3ac724c';
  const accessToken = useSelector((state) => state.team.accessToken);
  const [retrievedAccessToken, setRetrievedAccessToken] = useState(false);
  const linkedHandle = useSelector((state) => state.team.twitterHandle);

  useEffect(() => {
    // github returns a code in the url after user logs in
    const url = window.location.href;
    const hasCode = url.includes('?code=');
    // TODO: something is making this render twice without the extra condition

    if (hasCode && !retrievedAccessToken) {
      const code = url.split('?code=')[1];
      // we use this code to exchange an access token
      console.log(code);
      dispatch(getGHAccessToken(teamId, code));
      setRetrievedAccessToken(true);
    }
  });

  const GitHubLoginButton = () => (
    <a href={githubLoginUrl}>
      <GoMarkGithub />
      <span>Login with GitHub</span>
    </a>
  );

  const handleDeploy = () => {
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
      <GitHubLoginButton disabled={!retrievedAccessToken} />
      <DeployButton />{' '}
    </>
  );
};;

export default DeployPage;
