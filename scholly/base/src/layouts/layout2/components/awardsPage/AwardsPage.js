/**
 * The TeamPage component displays a list of team members.
 */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { TEAM_AWARDS } from '../../../../global/data';
import Awards from './Awards';

const AwardsPage = () => {
  const teamAwards = TEAM_AWARDS;
  return (
    <>
      <Container className="pages-top-padding text-center mt-4 mb-4">
        <div className="team-pg-title">Awards</div>
      </Container>
      <Container fluid>
        <Row xs={1} md={2} className="g-4">
          {teamAwards.map((award) => (
            <Awards award={award} key={award._id} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AwardsPage;
