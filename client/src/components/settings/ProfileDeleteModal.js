/**
 * This modal is used for confirmation when the delete button is clicked to
 * delete a team's account.
 */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  deleteTeam,
  deleteGHPages,
} from '../../actions/team';

const ProfileDeleteModal = ({ shouldShow, setShouldShow }) => {
  const { teamId } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (localStorage.getItem('GH_access_token') !== null) {
      dispatch(deleteGHPages(teamId));
    }
    dispatch(deleteTeam(teamId));
    setShouldShow(false);
  };

  return (
    <Modal show={shouldShow} onHide={() => setShouldShow(false)}>
      <Modal.Header className="modalHeader">
        <Modal.Title>
          Delete Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete your account?
        All significant data will be deleted including any deployed websites.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setShouldShow(false)}>
          Back
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// props validation
ProfileDeleteModal.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  setShouldShow: PropTypes.func.isRequired,
};

export default ProfileDeleteModal;
