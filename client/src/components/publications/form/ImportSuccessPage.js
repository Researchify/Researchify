/**
 * The ImportSucessPage component displays a list of publications returned by scholar api if the import is success
 */

import { useSelector, useDispatch } from 'react-redux';
import ImportedPublication from '../importedPublication/ImportedPublication';
import React from 'react';
import {
  createBulkPublications,
  retrieveMorePublications,
} from '../../../actions/publications';
import {
  Row,
  Button,
  Tooltip,
  OverlayTrigger,
  Pagination,
} from 'react-bootstrap';
import {
  IMPORT_CLEAR_STATE,
  CHANGE_ACTIVE_PAGE,
  UPDATE_PUBLICATIONS_TO_IMPORT,
} from '../../../actions/types';
import { pageSize } from '../../../config/publications';

const ImportSuccessPage = ({ closeModal }) => {
  const { publications } = useSelector((state) => state.importedPublications);
  const teamId = useSelector((state) => state.team.teamId);
  const { startFrom } = useSelector((state) => state.importedPublications);
  const { gScholarId } = useSelector((state) => state.importedPublications);
  const { reachedEnd } = useSelector((state) => state.importedPublications);
  const { activePage } = useSelector((state) => state.importedPublications);
  const { totalPages } = useSelector((state) => state.importedPublications);
  const { shownPublications } = useSelector(
    (state) => state.importedPublications
  );
  const { publicationsToImport } = useSelector(
    (state) => state.importedPublications
  );
  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  const renderPagination = () => {
    let pageItems = [];
    console.log('render pagination ' + activePage);
    for (let number = 1; number <= totalPages; number++) {
      pageItems.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={(event) => handlePageClick(event)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return pageItems;
  };

  const dispatch = useDispatch();

  const checkPublication = (index) => {
    const chosenPublication = shownPublications[index];
    const globalIndex = publications.indexOf(chosenPublication);
    let newCheckArray = publicationsToImport;
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
    dispatch(retrieveMorePublications(gScholarId, startFrom, teamId));
  };

  const handleConfirmImport = () => {
    let checkedPublications = publications.filter(
      (pub, idx) => publicationsToImport[idx]
    );
    for (let i = 0; i < checkedPublications.length; i++) {
      checkedPublications[i].yearPublished =
        checkedPublications[i].yearPublished.toString() + '-01-01';
    }
    checkedPublications = checkedPublications.map((pub) => ({
      ...pub,
      teamId: teamId,
    }));
    dispatch(createBulkPublications(teamId, checkedPublications));
    handleClose();
  };

  const handlePageForward = () => {
    dispatch({
      type: CHANGE_ACTIVE_PAGE,
      payload: {
        activePage: activePage + 1,
        shownPublications: publications.slice(
          activePage * pageSize,
          (activePage + 1) * pageSize
        ),
      },
    });
  };

  const handlePageBack = () => {
    dispatch({
      type: CHANGE_ACTIVE_PAGE,
      payload: {
        activePage: activePage - 1,
        shownPublications: publications.slice(
          (activePage - 2) * pageSize,
          (activePage - 1) * pageSize
        ),
      },
    });
  };

  const handlePageClick = (event) => {
    dispatch({
      type: CHANGE_ACTIVE_PAGE,
      payload: {
        activePage: parseInt(event.target.text),
        shownPublications: publications.slice(
          activePage * pageSize,
          (activePage + 1) * pageSize
        ),
      },
    });
  };

  return (
    <>
      {shownPublications.map((pub, idx) => (
        <ImportedPublication
          key={idx}
          pub={pub}
          index={idx}
          setChecked={checkPublication}
        />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {publications.length > 0 ? (
          <Pagination size="sm">
          <Pagination.Prev
            onClick={handlePageBack}
            disabled={activePage === 1}
          />
          {renderPagination()}
          <Pagination.Next
            onClick={handlePageForward}
            disabled={activePage === totalPages}
          />
        </Pagination>
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
            <Button
              className="mr-2"
              variant="outline-danger"
              onClick={handleClose}
            >
              Cancel
            </Button>
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
            <Button
              variant="primary"
              disabled={reachedEnd}
              onClick={handlePagination}
              style={reachedEnd ? { pointerEvents: 'none' } : {}}
            >
              {' '}
              Show more{' '}
            </Button>
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
              <Button
                variant="primary"
                disabled={!publicationsToImport.includes(true)}
                style={
                  !publicationsToImport.includes(true)
                    ? { pointerEvents: 'none' }
                    : {}
                }
                onClick={handleConfirmImport}
              >
                {' '}
                Import{' '}
              </Button>
            </div>
          </ConditionalWrapper>
        </div>
      </Row>
    </>
  );
};

export default ImportSuccessPage;
