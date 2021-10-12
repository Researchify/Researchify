/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Favicon from 'react-favicon';
import { TEAM_HOMEPAGE, TEAM_INFO } from '../../../../global/data';
import landingPicture from '../../../../shared/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg';
import RecentPublications from '../publications/RecentPublications';
import researchifyFavicon from '../../../../shared/images/favicon.ico';

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
      <Favicon url={researchifyFavicon} />
      <Container fluid className="pages-top-padding pages-side-padding">
        <Container fluid className="container-body">
          <img src={landingPicture} alt="Computer" align="left" className="left landing-image" style={{ width: '35%' }} />
          {homepageData.aboutUs.map((paragraph) => (
            <div className="landing-center-content">{paragraph}</div>
          ))}
        </Container>
        <Container fluid className="container-recent-pub-body">
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
