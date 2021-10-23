/**
 * This modal is used for confirmation when the reset button is clicked to
 * reset a team's data.
 */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  resetTeamData,
} from '../../actions/team';

const ProfileResetModal = ({ shouldShow, setShouldShow }) => {
  const { teamId } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetTeamData(teamId));
    setShouldShow(false);
  };

  return (
    <Modal show={shouldShow} onHide={() => setShouldShow(false)}>
      <Modal.Header className="modalHeader">
        <Modal.Title>
          Reset Account Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to reset your account?
        All significant data will be reset!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setShouldShow(false)}>
          Back
        </Button>
        <Button variant="danger" onClick={handleReset}>
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// props validation
ProfileResetModal.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  setShouldShow: PropTypes.func.isRequired,
};

export default ProfileResetModal;
