import React, { useState, useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import {
  Table,
  Tooltip,
  OverlayTrigger,
  Spinner,
} from 'react-bootstrap';
import '../Dashboard.css';
import { PropTypes } from 'prop-types';
import WebpageDelete from './WebpageDelete';
import WebpageSelector from './WebpageSelector';
import ConditionalWrapper from '../../shared/ConditionalWrapper';
import {
  PrimaryButton, SecondaryButton, DangerButton,
} from '../../shared/styledComponents';

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

  const [selectedPages, setSelectedPages] = useState([]);

  const [displayPageModal, setDisplayPageModal] = useState(false);
  const showDisplayPageModal = () => setDisplayPageModal(true);
  const closeDisplayPageModal = () => { setSelectedPages([]); setDisplayPageModal(false); };

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
  }, [currentWebPages]);

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
        selectedPages={selectedPages}
        setSelectedPages={setSelectedPages}
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
            <PrimaryButton
              className="mr-2"
              onClick={showDisplayPageModal}
              disabled={disableAddButton}
              style={disableAddButton ? { pointerEvents: 'none' } : {}}
            >
              Add Page
            </PrimaryButton>
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
                    Click &apos;Add Page&apos; to add more pages
                  </th>
                </tr>
              </thead>
            )
          }
          <tbody>
            <tr key="default-homepage">
              <td className="body">
                HOMEPAGE
                <SecondaryButton
                  className="action float-right mx-2"
                  onClick={() => {
                    directToAnotherPage('HOME PAGE');
                  }}
                >
                  <BsPencilSquare />
                </SecondaryButton>
              </td>
            </tr>

            {currentWebPages.map((webPage) => (
              <tr key={webPage}>
                <td className="body">
                  {webPage}
                  <DangerButton
                    className="action primary-danger float-right"
                    onClick={() => promptDeleteConfirmation(webPage)}
                  >
                    Delete
                  </DangerButton>
                  <SecondaryButton
                    className="action float-right mx-2"
                    onClick={() => {
                      directToAnotherPage(webPage);
                    }}
                  >
                    <BsPencilSquare />
                  </SecondaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

// props validation
Webpages.propTypes = {
  currentWebPages: PropTypes.array.isRequired,
  directToAnotherPage: PropTypes.func.isRequired,
  teamId: PropTypes.string.isRequired,
  setSelectedPage: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
  availablePages: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
Webpages.defaultProps = {
  loading: false,
};

export default Webpages;
