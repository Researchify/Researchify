import React, { useState, useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import {
  Table,
  Button,
  Tooltip,
  OverlayTrigger,
  Spinner,
} from 'react-bootstrap';
import '../Dashboard.css';
import WebpageDelete from './WebpageDelete';
import WebpageSelector from './WebpageSelector';
import ConditionalWrapper from '../../shared/ConditionalWrapper';

const Webpages = ({
  currentWebPages,
  directToAnotherPage,
  teamId,
  setSelectedPage,
  selectedPage,
  availablePages,
  loading,
}) => {
  const [displayDeleteModal, setDeleteModal] = useState(false);
  const showDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const [displayPageModal, setDisplayPageModal] = useState(false);
  const showDisplayPageModal = () => setDisplayPageModal(true);
  const closeDisplayPageModal = () => setDisplayPageModal(false);

  const [disableAddButton, setDisableAddButton] = useState(false);

  const renderDisableAddButtonTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      All available pages have been added
    </Tooltip>
  );

  useEffect(() => {
    if (
      availablePages.filter((page) => !currentWebPages.includes(page))
        .length === 0
    ) {
      setDisableAddButton(true);
    } else {
      setDisableAddButton(false);
    }
  }, [currentWebPages]); // eslint-disable-line react-hooks/exhaustive-deps

  const promptDeleteConfirmation = (pageName) => {
    setSelectedPage(pageName);
    showDeleteModal();
  };

  return (
    <>
      <WebpageDelete
        teamId={teamId}
        selectedPage={selectedPage}
        displayModal={displayDeleteModal}
        closeModal={closeDeleteModal}
        setSelectedPage={setSelectedPage}
      />
      <WebpageSelector
        teamId={teamId}
        currentWebPages={currentWebPages}
        displayModal={displayPageModal}
        closeModal={closeDisplayPageModal}
      />
      <div className="mb-3 text-center">
        <ConditionalWrapper
          condition={disableAddButton}
          wrapper={(children) => (
            <OverlayTrigger
              placement="bottom"
              overlay={renderDisableAddButtonTooltip}
            >
              {children}
            </OverlayTrigger>
          )}
        >
          <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
            <Button
              className="mr-2"
              onClick={showDisplayPageModal}
              disabled={disableAddButton}
              style={disableAddButton ? { pointerEvents: 'none' } : {}}
            >
              Add Page
            </Button>
          </div>
        </ConditionalWrapper>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover>
          {
            // Display appropriate message when no webpage is added
            currentWebPages.length === 0 && (
              <thead>
                <tr>
                  <th className="reduced-column tableHeading">
                    Click 'Add Page' to add more pages
                  </th>
                </tr>
              </thead>
            )
          }
          <tbody>
            <tr key="default-homepage">
              <td className="body">
                {'HOME PAGE'}
                <Button
                  variant="outline-success"
                  className="action float-right mx-2"
                  onClick={() => {
                    directToAnotherPage('HOME PAGE');
                  }}
                >
                  <BsPencilSquare />
                </Button>
              </td>
            </tr>

            {currentWebPages.map((webPage, index) => (
              <tr key={index}>
                <td className="body">
                  {webPage}
                  <Button
                    variant="outline-danger"
                    className="action primary-danger float-right"
                    onClick={() => promptDeleteConfirmation(webPage)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-success"
                    className="action float-right mx-2"
                    onClick={() => {
                      directToAnotherPage(webPage);
                    }}
                  >
                    <BsPencilSquare />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Webpages;
