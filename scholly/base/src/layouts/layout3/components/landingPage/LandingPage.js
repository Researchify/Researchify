/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TEAM_HOMEPAGE, TEAM_INFO } from '../../../../global/data';
import landingPicture from '../../../../shared/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg';
import RecentPublications from '../publications/RecentPublications';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const { teamName } = TEAM_INFO;
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
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={landingPicture} align="left" className="left landing-image" style={{ width: '35%' }} />
          {homepageData.aboutUs.map((paragraph) => (
            <div className="landing-center-content">{paragraph}</div>
          ))}
          <div className="recent-publications-title">Recent Publications</div>
          <div className="recent-publications-body">
            <RecentPublications />
          </div>
        </Container>
      </Container>
    </>
  );
};

export default landingPage;
