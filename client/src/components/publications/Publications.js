/**
 * The Publications component displays a list of publications
 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPublicationsByTeamId } from '../../actions/publications';
import { Modal, Spinner, Alert } from 'react-bootstrap';
import PublicationForm from './form/PublicationForm';
import ImportForm from './form/ImportForm';
import './publications.css';
import LayoutAllPublications from './publicationsLayout/LayoutAllPublications';
import LayoutByCategory from './publicationsLayout/LayoutByCategory';
import PublicationsButtons from './publicationsLayout/PublicationsButtons';
import PublicationsDropdown from './publicationsLayout/PublicationsDropdown';
import { layoutOption, sortingOption } from '../../config/publications';

const Publications = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const { publicationOptions } = useSelector((state) => state.website);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [layout, setLayout] = useState(layoutOption.ALL_PUBLICATION);
  const [sortBy, setsortBy] = useState(sortingOption.TITLE);

  const { loading, teamPublications } = useSelector((state) => state.publications);

  useEffect(() => {
    if(teamId){
      dispatch(getPublicationsByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  const renderPublications = () => {
    switch (layout) {
      case layoutOption.BY_CATEGORY:
        return <LayoutByCategory teamPublications={teamPublications} />;
      default:
        return <LayoutAllPublications teamPublications={teamPublications} />;
    }
  };

  return (
    <>
      <PublicationsButtons
        setShowCreateForm={setShowCreateForm}
        setShowImportForm={setShowImportForm}
      />
      <PublicationsDropdown
        layout={layout}
        setLayout={setLayout}
        sortBy={sortBy}
        setsortBy={setsortBy}
        publication={teamPublications}
        teamId={teamId}
      />
      <div className="text-center">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <h4>Total of {teamPublications.length} publications</h4>
        )}
      </div>

      {teamPublications.length === 0 && !loading ? (
        <Alert variant="primary">
          There is no publication for this team. Please add or import
          publications.
        </Alert>
      ) : (
        renderPublications()
      )}

      {/* A modal for showing create publication form */}
      <Modal show={showCreateForm}>
        <Modal.Header className="modalHeader">
          <Modal.Title> New Publication </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PublicationForm
            type="create"
            closeModal={() => setShowCreateForm(false)}
          />
        </Modal.Body>
      </Modal>

      {/* A modal for showing import publication form */}
      <Modal size="lg" show={showImportForm}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Import from Google Scholar </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportForm closeModal={() => setShowImportForm(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Publications;
