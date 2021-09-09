import React from 'react';
import { Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

const PublicationsButtons = ({ setShowCreateForm, setShowImportForm }) => (
  <div className="mb-3 mt-4 text-center">
    <Button className="mr-2" onClick={() => setShowCreateForm(true)}>
      Add Publication
    </Button>
    <Button className="ml-2" onClick={() => setShowImportForm(true)}>
      Import Publication
    </Button>
  </div>
);

PublicationsButtons.propTypes = {
  setShowCreateForm: PropTypes.func.isRequired,
  setShowImportForm: PropTypes.func.isRequired,
};

export default PublicationsButtons;
