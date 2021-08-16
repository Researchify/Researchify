import React, { useState } from 'react';
import { addPage, deletePage } from '../../../actions/website';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
} from 'react-bootstrap';

const WebpageDelete = (props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // dispatch(deletePage(props.teamId, props.selectedPage));
    console.log('delete');
    // setDeleteModal(false);
    // setSelectedPage(pagePlaceholder);
  };

  return (
    <>
      <Modal
        show={props.displayModal}
        onHide={props.closeModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Are you sure you want to delete the {props.selectedPage} page?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deleting the page will NOT remove the data associated with this page,
          but the page will not be shown on your website
          <Modal.Footer className="p-0">
            <Button variant="secondary" onClick={props.closeModal()}>
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

export default WebpageDelete;
