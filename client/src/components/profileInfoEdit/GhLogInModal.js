/**
 * Delete Alert Modal component display a modal and ask for confirmation when the delete button is clicked
 */

import React from 'react';
import toast from 'react-hot-toast';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import GitHubLogin from 'react-github-login';
import { PropTypes } from 'prop-types';
import { githubClientId, scope } from '../../config/deploy';
import { getGHAccessToken } from '../../actions/team';

const GhLogInModal = ({ logInAlert, setLogInAlert }) => {
  const dispatch = useDispatch();
  const { teamId } = useSelector((state) => state.team);
  const onSuccessfulLogin = (response) => {
    const { code } = response;
    // Now that we have the temporary code, we wish to exchange it for a GitHub
    // access token. This action will fetch the token and push it to localstorage.
    dispatch(getGHAccessToken(teamId, code));
    setLogInAlert(false);
  };
    // handle error toast when fail to log in
    // usually is when user close the login ndow
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
    <Modal show={logInAlert}>
      <Modal.Header className="modalHeader">
        <Modal.Title> Log in! </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Looks like you need to log in to continue the ongoing process!

        Please Login!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setLogInAlert(false)}>
          Back
        </Button>
        {GitHubLoginButton}
      </Modal.Footer>
    </Modal>
  );
};

// props validation
GhLogInModal.propTypes = {
  logInAlert: PropTypes.bool.isRequired,
  setLogInAlert: PropTypes.func.isRequired,
};
export default GhLogInModal;
