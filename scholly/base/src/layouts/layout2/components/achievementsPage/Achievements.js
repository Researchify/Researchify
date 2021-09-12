/**
 * The TeamPage component displays a list of team members.
 */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { TEAM_ACHIEVEMENTS } from '../../../../global/data';
import Achievement from './Achievement';

const Achievements = () => {
  const teamAchievements = TEAM_ACHIEVEMENTS;
  return (
    <>
      <Container className="pages-top-padding text-center mt-4 mb-4">
        <div className="team-pg-title">Achievements</div>
      </Container>
      <Container fluid>
        <Row xs={1} md={2} className="g-4">
          {teamAchievements.map((achievement) => (
            <Achievement achievement={achievement} key={achievement._id} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Achievements;
