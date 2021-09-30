/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import {
  Row, Col, Accordion, Container,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { TEAM_PUBLICATIONS, TEAM_HOMEPAGE, TEAM_INFO } from '../../../../global/data';
import TwitterFeed from '../twitter/TwitterFeed';
import Publication from '../publications/publication/Publication';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const { teamName, twitterHandle } = TEAM_INFO;
  const pubs = TEAM_PUBLICATIONS;

  return (
    <>
      <Helmet>
        <title>
          {' '}
          Home -
          {' '}
          {teamName}
          {' '}
        </title>
      </Helmet>
      <Container fluid className="pages-top-padding">
        <div className="landing-center-title">
          Welcome to
          {' '}
          {teamName}
          !
        </div>
        {homepageData.aboutUs.map((paragraph) => (
          <div className="landing-center-content">{paragraph}</div>
        ))}
        <Container fluid>
          <Row className="recent-publication-section">
            <Col xs="9">
              <div className="recent-pub-title">
                RECENT PUBLICATIONS
              </div>
              <Link to="/publication">
                (VIEW ALL PAPERS)
              </Link>
              {pubs.slice(0, 6).map((pub) => (
                <Accordion>
                  <Publication pub={pub} key={pub._id} />
                </Accordion>
              ))}
            </Col>
            <Col xs="3">
              <div className="recent-pub-title">NEWS</div>
              <TwitterFeed linkedHandle={twitterHandle} />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default landingPage;
