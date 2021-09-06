/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TEAM_HOMEPAGE, WEB_PAGES } from '../../global/data';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const { title } = WEB_PAGES;
  return (
    <>
      <Helmet>
        <title>
          {' '}
          Home -
          {' '}
          {title}
          {' '}
        </title>
      </Helmet>
      <Container fluid className="pages-top-padding">
        <div className="landing-center-title">About Us</div>
        {homepageData.aboutUs.map((paragraph) => (
          <div className="landing-center-content">{paragraph}</div>
        ))}
      </Container>
    </>
  );
};

export default landingPage;
