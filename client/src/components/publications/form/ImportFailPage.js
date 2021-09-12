/**
 * The ImportFailPage component displays an error message sent by scholar api if the import is failed
 */

import { Alert, Button, Row } from 'react-bootstrap';

import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { IMPORT_CLEAR_STATE } from '../../../actions/types';

const ImportFailPage = ({ closeModal }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    closeModal();
    dispatch({
      type: IMPORT_CLEAR_STATE,
    });
  };

  return (
    <>
      <Alert variant="danger">We were unable to import your publications.</Alert>
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
      </Row>
    </>
  );
};

// props validation
ImportFailPage.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ImportFailPage;
