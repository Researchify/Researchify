/**
 * The TeamPage component displays a list of team members.
 */
import React from 'react';
import { CardDeck, Container } from 'react-bootstrap';
import { TEAM_ACHIEVEMENTS } from '../../../../global/data';
import Achievement from './Achievement';

const Achievements = () => {
  const teamAchievements = TEAM_ACHIEVEMENTS;

  return (
    <>
      <Container className="pages-top-padding text-center mt-3 mb-3">
        <div className="team-pg-title w-100 text-center">Achievements</div>
      </Container>
      <Container fluid className="team-card-container">
        <CardDeck className="team-card-deck">
          {teamAchievements.map((achievement, i) => (
            <Achievement style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }} achievement={achievement} key={achievement._id} />
          ))}
        </CardDeck>
      </Container>
    </>
  );
};

export default Achievements;