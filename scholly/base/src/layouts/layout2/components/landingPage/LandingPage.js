/**
 * This file output landing page (homepage) of client-site.
 */
import React from 'react';
import {
  Col, Image, Row,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Favicon from 'react-favicon';
import parse from 'html-react-parser';

import { TEAM_HOMEPAGE, TEAM_INFO, TEAM_PUBLICATIONS } from '../../../../global/data';
import TwitterFeed from '../twitter/TwitterFeed';
import Publication from '../publications/publication/Publication';
import researchifyFavicon from '../../../../shared/images/favicon.ico';

const landingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const pubs = TEAM_PUBLICATIONS;
  const { teamName, twitterHandle, profilePic } = TEAM_INFO;
  return (
    <>
      <Helmet>
        <title>
          Home -
          {' '}
          {teamName}
          {' '}
        </title>
      </Helmet>
      <Favicon url={researchifyFavicon} />
      <h2>
        Welcome to
        {' '}
        {teamName}
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
              profilePic && (
              <Image
                style={{ maxWidth: '100%', height: 'auto', paddingBottom: 20 }}
                src={profilePic}
              />
              )
        }

      </div>
      <div className="mt-2 mb-5">
        <div style={{ textAlign: 'left' }}>
          {parse(homepageData.aboutUs)}
        </div>
      </div>
      <Row>
        <Col md={twitterHandle ? 9 : 12}>
          <div className="mb-4" style={{ textAlign: 'left' }}>
            <b>RECENT PUBLICATIONS </b>
            <Link to="/publication">
              (VIEW ALL PAPERS)
            </Link>
          </div>
          {pubs.slice(0, 5).map((pub) => (
            <Publication pub={pub} key={pub._id} />
          ))}
        </Col>
        {
            twitterHandle && (
            <Col md={3}>
              <div className="mb-4" style={{ textAlign: 'left' }}>
                <b>UPDATES </b>
                <div className="mt-4">
                  <TwitterFeed linkedHandle={twitterHandle} />
                </div>
              </div>
            </Col>
            )
          }

      </Row>
    </>
  );
};

export default landingPage;
