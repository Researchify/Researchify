/**
 * The PublicationPage component renders TwitterFeed component and Publications component .
 */

import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TwitterFeed from '../twitter/TwitterFeed';
import TwitterLink from '../twitter/TwitterLink';
import Publications from './Publications';

const PublicationPage = () => {
  const linkedHandle = useSelector((state) => state.team.twitterHandle);

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col className="pub-page-pub-col">
            <Container >
              <Publications />
            </Container>
          </Col>
          <Col className="pub-page-tweet-col">
            <Container >
              {linkedHandle ? <TwitterFeed /> : <TwitterLink />}
            </Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default PublicationPage;
