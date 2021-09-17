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
  const titleMessage = isDeleteFlag ? 'Delete Account Data!' : 'Clear Account Data!';
  const warningMessage = isDeleteFlag ? 'Are you sure you want to delete your account? ' : 'Are you sure you want to reset your account? ';
  const buttonName = isDeleteFlag ? 'Delete' : 'Clear';
  const HandleResetType = () => {
    const accessToken = localStorage.getItem('GH_access_token');
    console.log(teamId);
    dispatch(resetHomepage(teamId));
    dispatch(resetWebPage(teamId));
    console.log(teamId);
    dispatch(deleteGHPages(teamId, accessToken));
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
        All significant data will be deleted!
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