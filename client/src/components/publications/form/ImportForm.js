import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import ImportSuccessPage from './ImportSuccessPage';
import ImportFailPage from './ImportFailPage';
import ProfileLinkPage from './ProfileLinkPage';

const ImportForm = ({ closeModal }) => {
  const { importStatus, loading } = useSelector(
    (state) => state.importedPublications,
  );

  const displayResult = () => {
    switch (importStatus) {
      case 'SUCCESS':
        return <ImportSuccessPage closeModal={closeModal} />;
      case 'FAIL':
        return <ImportFailPage closeModal={closeModal} />;
      default:
        return <ProfileLinkPage closeModal={closeModal} />;
    }
  };

  if (loading) {
    return (
      <div className="mb-3 mt-3 text-center">
        <Spinner animation="border" />
      </div>
    );
  } if (importStatus !== null) {
    return (<div>{displayResult()}</div>);
  }
  return (<ProfileLinkPage closeModal={closeModal} />);
};

// props validation
ImportForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

// props validation
ImportForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ImportForm;
