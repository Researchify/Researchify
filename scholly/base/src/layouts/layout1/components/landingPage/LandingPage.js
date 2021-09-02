/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Container } from 'react-bootstrap';
import { TEAM_HOMEPAGE } from '../../../../global/data';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const element = (
    <>
      <>
        <Container fluid className="pages-top-padding">
          <div className="landing-center-title">About Us</div>
          {
                (homepageData == null)
                  ? homepageData.aboutUs.map((paragraph) => (
                    <div className="landing-center-content">{paragraph}</div>
                  )) : null

            }
        </Container>
      </>
    </>
  );
  return element;
};

export default landingPage;
