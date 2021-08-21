/**
 * The Publications component displays a list of publications
 */
import React, { useEffect, useState, useCallback } from 'react';
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
  const { loading, teamPublications } = useSelector((state) => state.publications);
  const [ showCreateForm, setShowCreateForm ] = useState(false);
  const [ showImportForm, setShowImportForm ] = useState(false);
  const [ options, setOptions ] = useState(publicationOptions);
  const [ publications, setPublications ] = useState(teamPublications);

  useEffect(() => {
    if(teamId){
      dispatch(getPublicationsByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  useEffect(() => {
    setOptions(publicationOptions)
  }, [publicationOptions])
  
  useEffect(() => {
    const sortedPublication = sortPublications(teamPublications, options.sortBy)
    setPublications(sortedPublication)
  }, [teamPublications])


  const renderPublications = useCallback(() => {
    switch (options.layout) {
      case layoutOption.BY_CATEGORY:
        return <LayoutByCategory teamPublications={publications} />;
      default:
        return <LayoutAllPublications teamPublications={publications} />;
    }
  }, [options, publications])


  const sortPublications = (publicationToBeSorted, option) => {
    switch (option) {
      case sortingOption.AUTHOR:
        publicationToBeSorted.sort((a, b) =>
          a.authors[0].toLowerCase() > b.authors[0].toLowerCase() ? 1 : -1
        );
        break;
      case sortingOption.TITLE:
        // publication title
        publicationToBeSorted.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
        break;
      case 'Category Title':
        // journal or conference title
        publicationToBeSorted.sort((a, b) =>
          a.category.categoryTitle.toLowerCase() >
          b.category.categoryTitle.toLowerCase()
            ? 1
            : -1
        );
        break;
      default:
        // sort by title then year for consistency with the db
        publicationToBeSorted.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
        publicationToBeSorted.sort((a, b) => (a.year > b.year ? -1 : 1));
        break;
    }
    return publicationToBeSorted
    };

  return (
    <>
      <PublicationsButtons
        setShowCreateForm={setShowCreateForm}
        setShowImportForm={setShowImportForm}
      />
      <PublicationsDropdown
        options={options}
        setOptions={setOptions}
        sortPublications={sortPublications}
        publication={publications}
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