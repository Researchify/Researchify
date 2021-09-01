import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { Button, Spinner, Form, Row, Col } from 'react-bootstrap';
import GitHubLogin from 'react-github-login';
import toast from 'react-hot-toast';

import { githubClientId, scope } from '../../../config/deploy';
import { getGHAccessToken, deployToGHPages } from '../../../actions/team';
import { updateWebsiteTitle } from '../../../actions/website';
import './DeployPage.css';

const DeployPage = ({ teamId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deploy.loading);
  const { title } = useSelector((state) => state.website);

  const retrievedAccessToken = useSelector(
    (state) => state.team.retrievedAccessToken,
  );
  const [input, setInput] = useState({websiteTitle: title});

  useEffect(() => {
    setInput({...input, websiteTitle: title})
  }, [title])


  const handleDeploy = () => {
    const accessToken = localStorage.getItem('GH_access_token'); // eslint-disable-line no-undef
    // call backend endpoint to deploy and give the access token
    dispatch(deployToGHPages(teamId, accessToken));
  };

  const handleUpdateTitle = () => {
    console.log(input)
    dispatch(updateWebsiteTitle(teamId, input));
  }

  const onSuccessfulLogin = (response) => {
    const { code } = response;
    // Now that we have the temporary code, we wish to exchange it for a GitHub
    // access token. This action will fetch the token and push it to localstorage.
    dispatch(getGHAccessToken(teamId, code));
  };

  // handle error toast when fail to log in
  // usually is when user close the login window
  const onLoginFail = () => {
    toast.error("You must login with GitHub to deploy");
  }

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

  const DeployButton = (
    <>
      <Form>
          <Form.Group as={Row} className='mt-3'>
          <Form.Label column >
            Website Title 
          </Form.Label>
          <Col sm="8">
            <Form.Control 
              type="text"
              value={input.websiteTitle}
              onChange={(event) => {
                setInput({...input, websiteTitle: event.target.value})}}
            />
          </Col>
          <Col sm='2'>
            <Button
              onClick={handleUpdateTitle}
              disabled={title === input.websiteTitle}
            > Save Title </Button>
          </Col>
          </Form.Group>
      </Form>
      <Button
        className="float-right"
        variant="primary"
        disabled={title !== input.websiteTitle}
        onClick={handleDeploy}
      >
        Deploy to GitHub Pages
      </Button>
    </>
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
