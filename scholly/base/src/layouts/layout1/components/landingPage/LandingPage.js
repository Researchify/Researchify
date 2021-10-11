/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';
import { TEAM_HOMEPAGE, TEAM_INFO } from '../../../../global/data';

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
        <div className="landing-center-content">
          {parse(homepageData.aboutUs)}
        </div>
      </Container>
    </>
  );
};

export default landingPage;
