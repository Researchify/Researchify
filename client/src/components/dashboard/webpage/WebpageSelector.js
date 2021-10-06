import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Row,
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
  // webpageOfferings = availablePages - currentWebPages
  // const webpageOfferings = availablePages.filter(
  //   (page) => !currentWebPages.includes(page),
  // );
  const [availPages, setAvailPages] = useState([]);
  console.log('available ', availPages);
  console.log('cuurent', currentWebPages);

  // To control disabling the 'Next' Button in the pop-up
  const [displayButton, setDisplayButton] = useState(true);

  const [selectedPages, setSelectedPages] = useState([]);

  const handlePageSelection = (page) => {
    if (!selectedPages.includes(page)) {
      selectedPages.push(page);
    } else {
      selectedPages.pop(page);
    }
    setSelectedPages(selectedPages);
    if (selectedPages.length > 0) {
      setDisplayButton(false);
    } else {
      setDisplayButton(true);
    }
  };

  const handleSubmit = () => {
    dispatch(addPage(teamId, selectedPages));
    setSelectedPages([]);
    closeModal();
  };

  useEffect(() => {
    console.log(pages.filter(
      (page) => !currentWebPages.includes(page),
    ));
    setAvailPages(pages.filter(
      (page) => !currentWebPages.includes(page),
    ));
  }, [pages]);

  return (
    <>
      <Modal show={displayModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Choose the Page you want to add to your website
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row xs={1} md={2} className="g-4">
            {availPages.map((pageName) => (
              <WebpageCard
                page={pageName}
                description={pageDescriptions[pageName]}
                handlePageSelection={handlePageSelection}
              />
            ))}
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
