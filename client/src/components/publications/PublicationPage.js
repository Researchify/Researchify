/**
 * The PublicationPage component renders TwitterFeed component and Publications component .
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Publications from './Publications';
import PublicationsEditor from './publicationsLayout/PublicationsEditor';
import PublicationForm from './form/PublicationForm';
import ImportForm from './form/ImportForm';
import { sortingOptions } from '../../config/publications';
import PublicationsPageWalkthrough from './publicationsOnboarding';

const sortPublications = (publicationToBeSorted, option) => {
  switch (option) {
    case sortingOptions.AUTHOR:
      publicationToBeSorted.sort((a, b) => {
        if (a.authors[0].toLowerCase() > b.authors[0].toLowerCase()) return 1;
        if (a.authors[0].toLowerCase() < b.authors[0].toLowerCase()) return -1;
        return 0;
      });
      break;
    case sortingOptions.TITLE:
      // publication title
      publicationToBeSorted.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      });
      break;
    case sortingOptions.YEAR:
      // year
      publicationToBeSorted.sort((a, b) => {
        if (a.year > b.year) return -1;
        if (a.year < b.year) return 1;
        return 0;
      });
      break;
    case 'Category Title':
      // journal or conference title
      publicationToBeSorted.sort((a, b) => {
        if (a.category.categoryTitle.toLowerCase() > b.category.categoryTitle.toLowerCase()) return 1;
        if (a.category.categoryTitle.toLowerCase() < b.category.categoryTitle.toLowerCase()) return -1;
        return 0;
      });
      break;
    default:
      // sort by title then year for consistency with the db
      publicationToBeSorted.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      });
      publicationToBeSorted.sort((a, b) => {
        if (a.year > b.year) return -1;
        if (a.year < b.year) return 1;
        return 0;
      });
      break;
  }
  return publicationToBeSorted;
};

const PublicationPage = () => {
  const { publicationOptions } = useSelector((state) => state.website);
  const { teamPublications } = useSelector((state) => state.publications);
  const [publications, setPublications] = useState(teamPublications);
  const teamId = useSelector((state) => state.team.teamId);
  const [options, setOptions] = useState(publicationOptions);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);

  useEffect(() => {
    setOptions(publicationOptions);
  }, [publicationOptions]);

  useEffect(() => {
    setPublications(teamPublications);
  }, [teamPublications]);

  return (
    <div className="publicationPageContainer">
      <div style={{ display: 'flex' }}>
        <h2 style={{ marginRight: '10px' }}> Publications </h2>
        <PublicationsPageWalkthrough />
      </div>
      <PublicationsEditor
        options={options}
        setOptions={setOptions}
        sortPublications={sortPublications}
        publications={publications}
        teamId={teamId}
        setShowCreateForm={setShowCreateForm}
        setShowImportForm={setShowImportForm}
      />

      <Publications
        options={options}
        sortPublications={sortPublications}
        publications={publications}
        teamId={teamId}
        setPublications={setPublications}
      />

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
    </div>
  );
};

export default PublicationPage;
