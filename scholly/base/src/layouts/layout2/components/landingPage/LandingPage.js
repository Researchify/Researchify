/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TEAM_HOMEPAGE, TEAM_INFO } from '../../../../global/data';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const { teamName } = TEAM_INFO;
  return (
    <div style={{ maxWidth: '1000px' }}>
      <Helmet>
        <title>
          {' '}
          Home -
          {' '}
          {teamName}
          {' '}
        </title>
      </Helmet>
      <Container className="text-center mt-3 mb-3">
        <h2>
          {' '}
          Welcome to the
          {' '}
          {teamName}
        </h2>
        <Image className="team-photo" src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        <div style={{ margin: '15px' }}>
          {homepageData.aboutUs.map((paragraph) => (
            <div style={{ textAlign: 'left' }}>
              {paragraph}
            </div>
          ))}
        </div>
        <br />
      </Container>
    </div>
  );
};

export default landingPage;
