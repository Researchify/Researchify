import { pageSize } from '../../../config/publications';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { IMPORT_CLEAR_STATE } from '../../../actions/types';
import { Row, Button, Alert } from 'react-bootstrap';
import {
  createBulkPublications,
  retrieveMorePublications,
} from '../../../actions/publications';

const ImportEmptyPage = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { gScholarId } = useSelector((state) => state.importedPublications);
  const { startFrom } = useSelector((state) => state.importedPublications);
  const teamId = useSelector((state) => state.team.teamId);
  const { reachedEnd } = useSelector((state) => state.importedPublications);
  const { error } = useSelector((state) => state.importedPublications);

  const handleClose = () => {
    closeModal();
    dispatch({
      type: IMPORT_CLEAR_STATE,
    });
  };

  const handlePagination = () => {
    dispatch(
      retrieveMorePublications(gScholarId, startFrom, teamId)
    );
  };

  return (
    <>
      <Alert variant="danger">{error}</Alert>
      <Row>
        <div className="ml-auto mt-3 mr-3">
          <Button
            className="mr-2"
            variant="outline-danger"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
        <div
          className="mt-2 ml-auto mr-3 text-center"
          style={{ display: 'inline-block', cursor: 'not-allowed' }}
        >
          <Button
            variant="primary"
            disabled={reachedEnd}
            onClick={handlePagination}
          >
            {' '}
            Show more{' '}
          </Button>
        </div>
      </Row>
    </>
  );
};

export default ImportEmptyPage;
