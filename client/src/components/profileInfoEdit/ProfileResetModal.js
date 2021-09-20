/**
 * Delete Alert Modal component display a modal and ask for confirmation when the delete button is clicked
 */

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';
import { resetTeamData, deleteGHPages } from '../../actions/team';
import { resetHomepage } from '../../actions/homepage';
import { resetWebPage } from '../../actions/website';

const ProfileResetModal = ({ resetAlert, setResetAlert, type }) => {
  const { teamId } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const isDeleteFlag = type;
  const titleMessage = isDeleteFlag ? 'Delete Account!' : 'Reset Account Data!';
  const warningMessage = isDeleteFlag ? 'Are you sure you want to delete your account? ' : 'Are you sure you want to reset your account? ';
  const buttonName = isDeleteFlag ? 'Delete' : 'Reset';
  const warningContent = isDeleteFlag ? 'All significant data will be reset!' : 'All significant data will be deleted including your account data!';
  const HandleResetType = () => {
    const accessToken = localStorage.getItem('GH_access_token');
    dispatch(resetHomepage(teamId));
    dispatch(resetWebPage(teamId));
    if (accessToken) {
      dispatch(deleteGHPages(teamId, accessToken));
    }
    // changes based on button clicked at run time
    dispatch(resetTeamData(teamId, isDeleteFlag));

    if (isDeleteFlag) {
      dispatch(logout());
    } else {
      setResetAlert(false);
    }
  };

  return (
    <Modal show={resetAlert}>
      <Modal.Header className="modalHeader">
        <Modal.Title>
          {titleMessage}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {warningMessage}
        {warningContent}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setResetAlert(false)}>
          Back
        </Button>
        <Button variant="danger" onClick={HandleResetType}>
          {buttonName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// props validation
ProfileResetModal.propTypes = {
  resetAlert: PropTypes.bool.isRequired,
  setResetAlert: PropTypes.func.isRequired,
  type: PropTypes.bool.isRequired,
};
export default ProfileResetModal;
