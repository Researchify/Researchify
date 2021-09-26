/**
 * Delete Alert Modal component display a modal and ask for confirmation when the delete button is clicked
 */

import React from 'react';
import toast from 'react-hot-toast';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { PropTypes } from 'prop-types';
import { githubClientId, scope } from '../../config/deploy';
import { getGHAccessToken } from '../../actions/team';
import { GHButton } from '../dashboard/deploy/DeployPage';

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
    <GHButton
      className="float-right github-login-button"
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

  return (
    <Modal show={logInAlert}>
      <Modal.Header className="modalHeader">
        <Modal.Title> Please Log in to GitHub </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You will need to login to your GitHub account to proceed with clearing your account data.
        </p>
        However, if you choose to not login, your GitHub repository containing your website data will not be deleted.
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
