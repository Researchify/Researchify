/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TEAM_HOMEPAGE, TEAM_INFO } from '../../../../global/data';
import profilePicture from '../../../../shared/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg';

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
      <Container fluid className="pages-top-padding">
        <div className="landing-center-title">About Us</div>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={profilePicture} align="left" className="left" />
        {homepageData.aboutUs.map((paragraph) => (
          <div className="landing-center-content">{paragraph}</div>
        ))}
      </Container>
    </>
  );
};

export default landingPage;
