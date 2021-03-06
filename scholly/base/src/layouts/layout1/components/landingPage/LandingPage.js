/**
 * This file output landing page (homepage) of client-site.
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  Row, Col, Accordion, Container, Image,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';

import { Link } from 'react-router-dom';
import Favicon from 'react-favicon';
import {
  TEAM_PUBLICATIONS, TEAM_HOMEPAGE, TEAM_INFO, TEAM_SITE_METADATA,
} from '../../../../global/data';
import TwitterFeed from '../twitter/TwitterFeed';
import Publication from '../publications/publication/Publication';
import researchifyFavicon from '../../../../shared/images/favicon.ico';

const LandingPage = () => {
  const homepageData = TEAM_HOMEPAGE;
  const themeOption = TEAM_SITE_METADATA.template.theme;
  const { teamName, twitterHandle, profilePic } = TEAM_INFO;
  const pubs = TEAM_PUBLICATIONS;
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight((Math.max(600, ref.current.clientHeight)));
  }, []);
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
      <Container fluid className="pages-top-padding">
        <Row>
          <Col md={twitterHandle ? 9 : 12}>
            <div ref={ref}>
              <Container fluid>
                <div className="landing-center-title">
                  Welcome to
                  {' '}
                  {teamName}
                  !
                </div>
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
                {parse(homepageData.aboutUs)}
                <div className="recent-pub-title">
                  RECENT PUBLICATIONS
                </div>
                <div className="recent-publication-link">
                  <Link to="/publication">
                    (VIEW ALL PAPERS)
                  </Link>
                </div>
                <div className="recent-publication">
                  {pubs.slice(0, 5).map((pub) => (
                    <Accordion>
                      <Publication pub={pub} key={pub._id} />
                    </Accordion>
                  ))}
                </div>
              </Container>
            </div>
          </Col>
          {
            twitterHandle && (
            <Col md={3} className="d-flex justify-content-end news-section" style={{ maxHeight: height }}>
              <TwitterFeed linkedHandle={twitterHandle} themeOption={themeOption} twitterHeight={height - 90} />
            </Col>
            )
          }
        </Row>
      </Container>
    </>
  );
};

export default LandingPage;
