/**
 * The PublicationPage component displays a list of publications and a twitter panel.
 */
import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TwitterFeed from '../twitter/TwitterFeed';
import Publications from './Publications';
import { TEAM_INFO } from '../../global/data';

const PublicationPage = () => {
  const linkedHandle = TEAM_INFO.twitterHandle;

  return (
    <Fragment>
      <Container className="pages-top-padding text-center mt-3 mb-3">
        <div className="publication-pg-title">Our Publications</div>
      </Container>
      {linkedHandle ? <Container fluid>
        <Row>
          <Col xs={12} md={10}>
            <Publications />
          </Col>
          <Col xs={4} md={2}>
            {linkedHandle ? <TwitterFeed linkedHandle={linkedHandle} /> : null}
          </Col>
        </Row>
      </Container> : <Container fluid>
   
            <Publications />

      </Container>}

    </Fragment>
  );
};

export default PublicationPage;
