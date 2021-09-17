/**
 * The Publications component displays a list of publications
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Alert, Jumbotron, Container,
} from 'react-bootstrap';
import { getPublicationsByTeamId } from '../../actions/publications';
import PublicationForm from './form/PublicationForm';
import ImportForm from './form/ImportForm';
import './publications.css';
import GroupByNone from './publicationsLayout/GroupByNone';
import GroupByCategory from './publicationsLayout/GroupByCategory';
import PublicationsEditor from './publicationsLayout/PublicationsEditor';
import { groupByOptions, sortingOptions } from '../../config/publications';

const Publications = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const { publicationOptions } = useSelector((state) => state.website);
  const { loading, teamPublications } = useSelector((state) => state.publications);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [options, setOptions] = useState(publicationOptions);
  const [publications, setPublications] = useState(teamPublications);

  useEffect(() => {
    if (teamId) {
      dispatch(getPublicationsByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  useEffect(() => {
    setOptions(publicationOptions);
  }, [publicationOptions]);

  const renderPublications = () => {
    switch (options.groupBy) {
      case groupByOptions.CATEGORY:
        return <GroupByCategory teamPublications={publications} />;
      default:
        return <GroupByNone teamPublications={publications} />;
    }
  };

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

  useEffect(() => {
    const sortedPublication = sortPublications(teamPublications, options.sortBy);
    setPublications(sortedPublication);
  }, [teamPublications]);

  return (
    <Jumbotron>
      <Container fluid className="publication-editor">
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <PublicationsEditor
            options={options}
            setOptions={setOptions}
            sortPublications={sortPublications}
            publications={publications}
            teamId={teamId}
            setShowCreateForm={setShowCreateForm}
            setShowImportForm={setShowImportForm}
          />
        </div>
      </Container>

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
    </Jumbotron>
  );
};

export default Publications;
