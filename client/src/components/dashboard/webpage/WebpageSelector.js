import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Modal, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { addPage } from '../../../actions/website';
import { availablePages as pages } from '../../../config/clientWebsite';

const WebpageSelector = ({
  currentWebPages, teamId, closeModal, displayModal,
}) => {
  const dispatch = useDispatch();
  // All our web-page offerings
  const availablePages = pages;
  // webpageOfferings = availablePages - currentWebPages
  const webpageOfferings = availablePages.filter(
    (page) => !currentWebPages.includes(page),
  );
  const pagePlaceholder = 'Select page to add';

  const [selectedPage, setSelectedPage] = useState(pagePlaceholder);

  // To control disabling the 'Next' Button in the pop-up
  const [displayButton, setDisplayButton] = useState(true);

  const handlePageSelection = (e) => {
    setSelectedPage(e);
    setDisplayButton(false);
  };

  const handleSubmit = () => {
    dispatch(addPage(teamId, selectedPage));
    setSelectedPage(pagePlaceholder);
    closeModal();
  };

  return (
    <>
      <Modal show={displayModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Choose the Page you want to add to your website
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton
            className="mx-10"
            id="dropdown-basic-button"
            variant="secondary"
            title={selectedPage}
            onSelect={handlePageSelection}
          >
            {webpageOfferings.map((pageName) => (
              <Dropdown.Item key={pageName} eventKey={pageName}>
                {pageName}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <Button
            className="float-right"
            disabled={displayButton}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

WebpageSelector.propTypes = {
  currentWebPages: PropTypes.isRequired,
  teamId: PropTypes.isRequired,
  closeModal: PropTypes.isRequired,
  displayModal: PropTypes.isRequired,
};

export default WebpageSelector;
