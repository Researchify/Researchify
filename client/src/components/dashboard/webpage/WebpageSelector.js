import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Row, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import WebpageCard from './WebpageCard';
import { addPage } from '../../../actions/website';
import { availablePages as pages, pageDescriptions } from '../../../config/clientWebsite';
import { PrimaryButton } from '../../shared/styledComponents';
import ConditionalWrapper from '../../shared/ConditionalWrapper';

const WebpageSelector = ({
  currentWebPages, teamId, closeModal, displayModal,
}) => {
  const dispatch = useDispatch();

  const [availablePages, setAvailablePages] = useState([]);

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
    // calculate the available pages based on selected pages
    setAvailablePages(pages.filter(
      (page) => !currentWebPages.includes(page),
    ));
  }, [currentWebPages]);

  const renderDisableConfirmButtonTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please select a page to add
    </Tooltip>
  );

  return (
    <>
      <Modal show={displayModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Choose the page you want to add to your website
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: 'auto', width: '74%' }}>
            <Row xs={1} md={2} className="g-4">
              {availablePages.map((pageName) => (
                <WebpageCard
                  page={pageName}
                  description={pageDescriptions[pageName]}
                  handlePageSelection={handlePageSelection}
                />
              ))}
            </Row>
          </div>
          <ConditionalWrapper
            condition={displayButton}
            wrapper={(children) => (
              <OverlayTrigger
                placement="bottom"
                overlay={renderDisableConfirmButtonTooltip}
              >
                {children}
              </OverlayTrigger>
            )}
          >
            <div style={{ display: 'inline-block', cursor: 'not-allowed', float: 'right' }}>
              <PrimaryButton
                disabled={displayButton}
                onClick={handleSubmit}
                style={displayButton ? { pointerEvents: 'none' } : {}}
              >
                Confirm
              </PrimaryButton>
            </div>

          </ConditionalWrapper>
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
