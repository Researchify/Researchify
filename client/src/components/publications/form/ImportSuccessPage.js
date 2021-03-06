/**
 * The ImportSucessPage component displays a list of publications returned by scholar api if the import is success
 */

import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import {
  Row,
  Tooltip,
  OverlayTrigger,
  ListGroup,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import ImportedPublication from '../importedPublication/ImportedPublication';
import {
  createBulkPublications,
  importPublications,
} from '../../../actions/publications';
import {
  IMPORT_CLEAR_STATE,
  UPDATE_PUBLICATIONS_TO_IMPORT,
} from '../../../actions/types';
import { pageSize } from '../../../config/publications';
import usePagination from '../../shared/usePagination';
import ConditionalWrapper from '../../shared/ConditionalWrapper';
import { PrimaryButton, DangerButton } from '../../shared/styledComponents';

const ImportSuccessPage = ({ closeModal }) => {
  const teamId = useSelector((state) => state.team.teamId);
  const dispatch = useDispatch();
  const {
    publications,
    startFrom,
    gScholarId,
    reachedEnd,
    publicationsToImport,
  } = useSelector((state) => state.importedPublications);
  const { currentData, pagination } = usePagination(publications, pageSize);

  const checkPublication = (index) => {
    const chosenPublication = currentData()[index];
    const globalIndex = publications.indexOf(chosenPublication);
    const newCheckArray = publicationsToImport;
    newCheckArray[globalIndex] = !newCheckArray[globalIndex];
    dispatch({
      type: UPDATE_PUBLICATIONS_TO_IMPORT,
      payload: newCheckArray,
    });
    return newCheckArray[index];
  };

  const renderNoPublicationsSelectedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      No publications are selected
    </Tooltip>
  );

  const renderEndOfPublicationsTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      All publications have been retrieved
    </Tooltip>
  );

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You will lose your progress
    </Tooltip>
  );

  const handleClose = () => {
    closeModal();
    dispatch({
      type: IMPORT_CLEAR_STATE,
    });
  };

  const handlePagination = () => {
    dispatch(importPublications(gScholarId, startFrom, teamId));
  };

  const handleConfirmImport = () => {
    let checkedPublications = publications.filter(
      (pub, idx) => publicationsToImport[idx],
    );
    for (let i = 0; i < checkedPublications.length; i++) {
      checkedPublications[i].yearPublished = `${checkedPublications[i].yearPublished.toString()}-01-01`;
    }
    checkedPublications = checkedPublications.map((pub) => ({
      ...pub,
      teamId,
    }));
    dispatch(createBulkPublications(teamId, checkedPublications));
    handleClose();
  };

  return (
    <>
      <ListGroup>
        {currentData().map((pub, idx) => (
          <ImportedPublication
            key={pub}
            pub={pub}
            index={idx}
            setChecked={checkPublication}
          />
        ))}
      </ListGroup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {publications.length > 0 ? (
          <span style={{ marginTop: '10px' }}>
            {pagination()}
          </span>
        ) : (
          <h4>No publications retrieved so far...</h4>
        )}
      </div>
      <Row>
        <div className="mt-2 ml-3">
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={renderTooltip}
          >
            <DangerButton
              className="mr-2"
              onClick={handleClose}
            >
              Cancel
            </DangerButton>
          </OverlayTrigger>
        </div>
        <ConditionalWrapper
          condition={reachedEnd}
          wrapper={(children) => (
            <OverlayTrigger
              placement="bottom"
              overlay={renderEndOfPublicationsTooltip}
            >
              {children}
            </OverlayTrigger>
          )}
        >
          <div
            className="mt-2 ml-auto mr-3 text-center"
            style={{ display: 'inline-block', cursor: 'not-allowed' }}
          >
            <PrimaryButton
              disabled={reachedEnd}
              onClick={handlePagination}
              style={reachedEnd ? { pointerEvents: 'none' } : {}}
            >
              Show more
            </PrimaryButton>
          </div>
        </ConditionalWrapper>

        <div className="mt-2 ml-auto mr-3">
          <ConditionalWrapper
            condition={!publicationsToImport.includes(true)}
            wrapper={(children) => (
              <OverlayTrigger
                placement="bottom"
                overlay={renderNoPublicationsSelectedTooltip}
              >
                {children}
              </OverlayTrigger>
            )}
          >
            <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
              <PrimaryButton
                disabled={!publicationsToImport.includes(true)}
                style={
                  !publicationsToImport.includes(true)
                    ? { pointerEvents: 'none' }
                    : {}
                }
                onClick={handleConfirmImport}
              >
                Import
              </PrimaryButton>
            </div>
          </ConditionalWrapper>
        </div>
      </Row>
    </>
  );
};

// props validation
ImportSuccessPage.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ImportSuccessPage;
