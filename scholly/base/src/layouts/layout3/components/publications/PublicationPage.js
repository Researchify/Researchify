/**
 * The PublicationPage component displays a list of publications and a twitter panel.
 */
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet';
import { TEAM_INFO } from '../../../../global/data';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import TwitterFeed from '../twitter/TwitterFeed';
import Publications from './Publications';
// import { TEAM_INFO } from '../../global/data';

const PublicationPage = () => {
  const { teamName } = TEAM_INFO;
  return (
    <>
      <Helmet>
        <title>
          {' '}
          Publications -
          {' '}
          {teamName}
          {' '}
        </title>
      </Helmet>
      <Container className="pages-top-padding page-publications-side-padding mt-3 mb-3">
        <div className="publication-pg-title">Our Publications</div>
        <Container fluid className="publication-container-body">
          <Publications />
        </Container>
      </Container>
    </>
  );
};
export default PublicationPage;
