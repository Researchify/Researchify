/**
 * The PublicationPage component displays a list of publications and a twitter panel.
 */
import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import TwitterFeed from '../twitter/TwitterFeed';
import Publications from './Publications';
// import { TEAM_INFO } from '../../global/data';

const PublicationPage = () => (
// const linkedHandle = TEAM_INFO.twitterHandle;
  //
  // Logic of showing twitter gadget. Removed for now. Wait for a better design.
  //
  // <Fragment>
  //   {linkedHandle ? (
  //     <Container fluid className="pages-top-padding ">
  //       <Row>
  //         <Col className="pub-main-left">
  //           <Container className="text-center mt-3 mb-3">
  //             <div className="publication-pg-title">Our Publications</div>
  //           </Container>
  //           <Publications />
  //         </Col>
  //         <Col className="pub-twitter-right">
  //           <TwitterFeed linkedHandle={linkedHandle} />
  //         </Col>
  //       </Row>
  //     </Container>
  //   ) : (
  //     <Fragment>
  //       <Container className="pages-top-padding text-center mt-3 mb-3">
  //         <div className="publication-pg-title">Our Publications</div>
  //       </Container>
  //       <Container fluid>
  //         <Publications />
  //       </Container>
  //     </Fragment>
  //   )}
  // </Fragment>

  <>
    <Container className="pages-top-padding text-center mt-3 mb-3">
      <div className="publication-pg-title">Our Publications</div>
    </Container>
    <Container fluid>
      <Publications />
    </Container>
  </>
);
export default PublicationPage;
