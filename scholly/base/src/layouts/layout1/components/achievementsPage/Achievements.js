/**
 * The TeamPage component displays a list of team members.
 */
import React from 'react';
import { CardDeck, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TEAM_ACHIEVEMENTS, TEAM_INFO } from '../../../../global/data';
import Achievement from './Achievement';

const Achievements = () => {
  const teamAchievements = TEAM_ACHIEVEMENTS;
  const { teamName } = TEAM_INFO;
  return (
    <>
      <Helmet>
        <title>
          {' '}
          Achievements -
          {' '}
          {teamName}
          {' '}
        </title>
      </Helmet>
      <Container className="pages-top-padding text-center mt-3 mb-3">
        <div className="team-pg-title">Achievements</div>
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
