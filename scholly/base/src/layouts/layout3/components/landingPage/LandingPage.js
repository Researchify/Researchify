/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TEAM_HOMEPAGE, TEAM_INFO, TEAM_SITE_METADATA } from '../../../../global/data';
import landingPicture from '../../../../shared/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg';
import RecentPublications from '../publications/RecentPublications';
import TwitterFeed from '../twitter/TwitterFeed';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const { teamName, twitterHandle } = TEAM_INFO;
  const { template } = TEAM_SITE_METADATA;
  const themeOption = template.theme;

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
      <Container fluid className="pages-top-padding pages-side-padding">
        <Container fluid className="container-body">
          <img src={landingPicture} alt="Computer" align="left" className="left landing-image" style={{ width: '35%' }} />
          {homepageData.aboutUs.map((paragraph) => (
            <div className="landing-center-content">{paragraph}</div>
          ))}
        </Container>
        <Row className="container-body">
          {
            twitterHandle && (
            <Col md={3} className="news-section">
              <TwitterFeed linkedHandle={twitterHandle} themeOption={themeOption} twitterHeight={560} />
            </Col>
            )
          }
          <Col md={twitterHandle ? 9 : 12}>
            <Container fluid className="container-recent-pub-body">
              <div className="recent-publications-title">Recent Publications</div>
              <div className="recent-publications-body">
                <RecentPublications />
              </div>
            </Container>
          </Col>
        </Row>

      </Container>
    </>
  );
};

export default landingPage;
