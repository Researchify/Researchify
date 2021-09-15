/**
 * Delete Alert Modal component display a modal and ask for confirmation when the delete button is clicked
 */

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { successMessageCreator } from '../../notification/notificationReduxFunctions';
import { logout } from '../../actions/auth';
import { resetTeamData, deleteGHPages } from '../../actions/team';

const ProfileResetModal = ({ resetAlert, setResetAlert, type }) => {
  const { teamId } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const isDeleteFlag = type;
  const HandleDelete = () => {
    const access_token = localStorage.getItem('GH_access_token');
    dispatch(deleteGHPages(teamId, access_token));
    dispatch(resetTeamData(teamId, isDeleteFlag));
    dispatch(logout());
    dispatch(successMessageCreator('Profile data cleared successfully!'));
  };

  const HandleClear = () => {
    const accessToken = localStorage.getItem('GH_access_token');
    dispatch(deleteGHPages(teamId, accessToken));
    dispatch(resetTeamData(teamId, isDeleteFlag));
    setResetAlert(false);
    dispatch(successMessageCreator('Profile data cleared successfully!'));
  };

  const titleMessage = isDeleteFlag ? 'Delete Account Data!' : 'Clear Account Data!';
  const warningMessage = isDeleteFlag ? 'Are you sure you want to delete your account? ' : 'Are you sure you want to reset your account? ';
  const buttonName = isDeleteFlag ? 'Delete' : 'Clear';
  const HandleResetType = () => {
    if (isDeleteFlag) {
      HandleDelete();
    } else {
      HandleClear();
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
export default ProfileResetModal;
