import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, DropdownButton, Dropdown, Row,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import WebpageCard from './WebpageCard';
import { addPage } from '../../../actions/website';
import { availablePages as pages, pageDescriptions } from '../../../config/clientWebsite';
import { PrimaryButton } from '../../shared/styledComponents';

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
          {console.log(webpageOfferings)}
          <Row xs={1} md={2} className="g-4">
            {webpageOfferings.map((pageName) => (<WebpageCard page={pageName} description={pageDescriptions[pageName]} />))}
          </Row>
          <PrimaryButton
            className="float-right"
            disabled={displayButton}
            onClick={handleSubmit}
          >
            Confirm
          </PrimaryButton>
        </Modal.Body>
      </Modal>
    </>
  );
};

// props validation
WebpageSelector.propTypes = {
  currentWebPages: PropTypes.array.isRequired,
  teamId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  displayModal: PropTypes.bool.isRequired,
};

export default WebpageSelector;
