import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { Spinner, Modal, Card } from 'react-bootstrap';
import GitHubLogin from 'react-github-login';
import toast from 'react-hot-toast';
import { PropTypes } from 'prop-types';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';

import { githubClientId, scope } from '../../../config/deploy';
import { deployToGHPages } from '../../../actions/team';

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

const FABStyle = {
  // Needed to make the button floating
  margin: 0,
  top: 'auto',
  right: 25,
  bottom: 35,
  left: 'auto',
  position: 'fixed',
  // For consistency with other button styles
  padding: '.375rem .75rem',
  border: '1px solid #56658a',
  borderRadius: '.25rem',
  backgroundColor: '#56658a',
  color: 'white',
};

const DeployBtn = ({ teamId, position }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const loading = useSelector((state) => state.deploy.loading);

  const webUrl = useSelector((state) => state.website.url);

  const onSuccessfulLogin = (response) => {
    const { code } = response;
    // Now that we have the temporary code, we wish to exchange it for a GitHub
    // access token.
    dispatch(deployToGHPages(teamId, code));
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

  // Display the user's deployed website URL, if available
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

  const floatingBtnStyle = { ...FABStyle, ...position };

  return (
    <>
      <Fab
        style={floatingBtnStyle}
        variant="extended"
        size="medium"
        disableRipple
        className="float-right"
        onClick={() => setShowModal(true)}
      >
        Deploy Website
      </Fab>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
DeployBtn.propTypes = {
  teamId: PropTypes.string.isRequired,
  position: PropTypes.object,
};
DeployBtn.defaultProps = {
  position: { },
};

export default DeployBtn;
