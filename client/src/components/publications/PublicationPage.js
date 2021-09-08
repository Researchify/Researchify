/**
 * The PublicationPage component renders TwitterFeed component and Publications component .
 */

import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Container } from 'react-bootstrap';
import TwitterFeed from '../twitter/TwitterFeed';
import TwitterLink from '../twitter/TwitterLink';
import Publications from './Publications';

const PublicationPage = () => {
  const linkedHandle = useSelector((state) => state.team.twitterHandle);

  return (
    <>
      <Row>
        <Col className="pub-page-pub-col">
          <Container className="publication-editor" fuild style={{ backgroundColor: 'red' }}>
            dewde
          </Container>
          <Publications />
        </Col>
        <Col className="pub-page-tweet-col">
          {linkedHandle ? <TwitterFeed /> : <TwitterLink />}
        </Col>
      </Row>
    </>
  );
};

export default PublicationPage;
