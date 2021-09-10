/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { TEAM_HOMEPAGE } from '../../../../global/data';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  return (
    <>
      <Container fluid className="pages-top-padding">
        <div className="landing-center-title">About Us</div>
        <Image className="team-photo" src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        {homepageData.aboutUs.map((paragraph) => (
          <div className="landing-center-content">{paragraph}</div>
        ))}
        <br />
      </Container>
    </>
  );
};

export default landingPage;