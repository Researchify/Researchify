/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Container } from 'react-bootstrap';
import { TEAM_HOMEPAGE } from '../../../../global/data';
import profilePicture from '../../../../shared/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  return (
    <>
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