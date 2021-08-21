import React, { useState } from 'react';
import { addPage } from '../../../actions/website';
import { availablePages as pages } from '../../../config/clientWebsite';
import { useDispatch } from 'react-redux';
import { Button, Modal, DropdownButton, Dropdown } from 'react-bootstrap';

const WebpageSelector = (props) => {
  const dispatch = useDispatch();
  // All our web-page offerings
  const availablePages = pages;
  // webpageOfferings = availablePages - currentWebPages
  const webpageOfferings = availablePages.filter(
    (page) => !props.currentWebPages.includes(page)
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
    dispatch(addPage(props.teamId, selectedPage));
    props.closeModal();
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
              <Dropdown.Item eventKey={pageName}>{pageName}</Dropdown.Item>
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

export default WebpageSelector;