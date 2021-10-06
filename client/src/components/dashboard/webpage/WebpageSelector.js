import React, { useState } from 'react';
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
  const availablePages = pages;
  // webpageOfferings = availablePages - currentWebPages
  // const webpageOfferings = availablePages.filter(
  //   (page) => !currentWebPages.includes(page),
  // );
  const [availPages, setAvailPages] = useState(availablePages.filter(
    (page) => !currentWebPages.includes(page),
  ));
  console.log(availPages);

  // To control disabling the 'Next' Button in the pop-up
  const [displayButton, setDisplayButton] = useState(true);

  const [selectedPages, setSelectedPages] = useState([]);

  const refreshWebpagesOfferings = () => {
    setAvailPages(availPages.filter(
      (page) => !currentWebPages.includes(page),
    ));
  };

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
    refreshWebpagesOfferings();
  };

  const handleSubmit = () => {
    dispatch(addPage(teamId, selectedPages));
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
          <div style={{ margin: 'auto', width: '74%' }}>
            <Row xs={1} md={2} className="g-4">
              {availPages.map((pageName) => (

                <WebpageCard
                  page={pageName}
                  description={pageDescriptions[pageName]}
                  handlePageSelection={handlePageSelection}
                />

              ))}
            </Row>
          </div>
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
