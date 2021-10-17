/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';
import { TEAM_HOMEPAGE, TEAM_INFO, TEAM_SITE_METADATA } from '../../../../global/data';
import RecentPublications from '../publications/RecentPublications';
import TwitterFeed from '../twitter/TwitterFeed';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const { teamName, twitterHandle, profilePic } = TEAM_INFO;
  const { template } = TEAM_SITE_METADATA;
  const { theme } = template;

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
          {
              profilePic && (<img src={profilePic} alt="Computer" align="left" className="left landing-image" style={{ width: '35%' }} />)
          }
          <div className="landing-center-content">
            {parse(homepageData.aboutUs)}
          </div>
        </Container>
        <br />
        <Container fluid className="container-body">
          <Row>
            {
              twitterHandle && (
              <Col md={3} className="news-section">
                <TwitterFeed linkedHandle={twitterHandle} themeOption={theme} twitterHeight={560} />
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
      </Container>
    </>
  );
};

export default landingPage;
