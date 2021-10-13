import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { Spinner, Modal, Card } from 'react-bootstrap';
import GitHubLogin from 'react-github-login';
import toast from 'react-hot-toast';
import { PropTypes } from 'prop-types';

import styled from 'styled-components';
import { githubClientId, scope } from '../../../config/deploy';
import { getGHAccessToken, deployToGHPages } from '../../../actions/team';

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

const DeployPage = ({ teamId, showModal, handleClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deploy.loading);

  const webUrl = useSelector((state) => state.website.url);

  const handleDeploy = () => {
    const accessToken = localStorage.getItem('GH_access_token');
    // call backend endpoint to deploy and give the access token
    dispatch(deployToGHPages(teamId, accessToken));
  };

  const onSuccessfulLogin = (response) => {
    const { code } = response;
    // Now that we have the temporary code, we wish to exchange it for a GitHub
    // access token. This action will fetch the token and push it to local storage.
    dispatch(getGHAccessToken(teamId, code));
    handleDeploy();
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
      Deploy using GitHub
    </GHButton>
  );

  const webUrlInfo = (
    <Card style={{ marginTop: '15px' }}>
      <Card.Body>
        My website link:
        <a href={`//${webUrl}`} target="_blank" style={{ float: 'right', marginRight: '15px' }} rel="noreferrer">
          {webUrl}
        </a>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deploy Website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <i style={{ fontSize: '15px' }}>
            When deploying the site you will need to sign into your GitHub account and authorize us to edit your GitHub pages repository. This allows us to host your website for free!
            <br />
            To find out more
            { // If webUrl is present, the website has already been deployed once
              webUrl ? '' : ' and to create your account '
            }
            {' '}
            visit the
            <a href="https://github.com"> GitHub website.</a>
          </i>
          <br />
          {webUrl ? webUrlInfo : ''}
        </Modal.Body>
        <Modal.Footer>
          { (() => {
            if (loading) {
              return (
                <div className="mb-3 mt-3" style={{ marginRight: '50%' }}>
                  <Spinner animation="border" />
                </div>
              );
            }
            return (GitHubLoginButton);
          })()}
        </Modal.Footer>
      </Modal>
    </>
  );
};

// props validation
DeployPage.propTypes = {
  teamId: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DeployPage;
