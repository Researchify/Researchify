/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import {
  Row, Col, Accordion, Container,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  TEAM_PUBLICATIONS, TEAM_HOMEPAGE, TEAM_INFO, TEAM_SITE_METADATA,
} from '../../../../global/data';
import TwitterFeed from '../twitter/TwitterFeed';
import Publication from '../publications/publication/Publication';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const themeOption = TEAM_SITE_METADATA.template.theme;
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
            <Col md={twitterHandle ? 9 : 12}>
              <div className="recent-pub-title">
                RECENT PUBLICATIONS
              </div>
              <div className="recent-publication-link">
                <Link to="/publication">
                  (VIEW ALL PAPERS)
                </Link>
              </div>
              {pubs.slice(0, 6).map((pub) => (
                <Accordion>
                  <Publication pub={pub} key={pub._id} />
                </Accordion>
              ))}
            </Col>
            {
              twitterHandle && (
              <Col md={3}>
                <div className="recent-pub-title">NEWS</div>
                <TwitterFeed linkedHandle={twitterHandle} themeOption={themeOption} />
              </Col>
              )
            }
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default landingPage;
