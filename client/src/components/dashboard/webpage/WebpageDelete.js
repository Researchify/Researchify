import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { deletePage } from '../../../actions/website';

const WebpageDelete = ({
  teamId, selectedPage, setSelectedPage, pagePlaceholder, closeModal, displayModal,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePage(teamId, selectedPage));
    setSelectedPage(pagePlaceholder);
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      <Modal
        show={displayModal}
        onHide={closeModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Are you sure you want to delete the
            {' '}
            {selectedPage}
            {' '}
            page?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deleting the page will NOT remove the data associated with this page,
          but the page will not be shown on your website
          <Modal.Footer className="p-0">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete This Page
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

// props validation
WebpageDelete.propTypes = {
  teamId: PropTypes.string.isRequired,
  selectedPage: PropTypes.string.isRequired,
  setSelectedPage: PropTypes.func.isRequired,
  pagePlaceholder: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  displayModal: PropTypes.bool.isRequired,
};
WebpageDelete.defaultProps = {
  pagePlaceholder: '',
};

export default WebpageDelete;
