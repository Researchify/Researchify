/**
 * Delete Alert Modal component display a modal and ask for confirmation when the delete button is clicked
 */
import React from 'react';
import toast from 'react-hot-toast';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { successMessageCreator } from '../../notification/notificationReduxFunctions';
import { logout } from '../../actions/auth';
import { clearTeam, deleteGHPages } from '../../actions/team';

const ProfileDeleteModal = ({ deleteAlert, setDeleteAlert }) => {
  const { teamId } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const HandleDelete = () => {
    const access_token = localStorage.getItem('GH_access_token');
    try {
      dispatch(deleteGHPages(teamId, access_token));
    } catch (error) {
      toast.error('GitHub Pages doesnt exist');
    }
    const isDeleteFlag = true;
    dispatch(clearTeam(teamId, isDeleteFlag));
    dispatch(logout());
    dispatch(successMessageCreator('Profile data cleared successfully!'));
  };
  return (
    <Modal show={deleteAlert}>
      <Modal.Header className="modalHeader">
        <Modal.Title> Delete Account! </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete your account? All significant data will be deleted!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setDeleteAlert(false)}>
          Back
        </Button>
        <Button variant="danger" onClick={HandleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileDeleteModal;
