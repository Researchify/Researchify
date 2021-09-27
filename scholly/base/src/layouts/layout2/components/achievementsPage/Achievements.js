/**
 * The TeamPage component displays a list of team members.
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
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
      <Container fluid>
        {teamAchievements.map((achievement) => (
          <Achievement achievement={achievement} key={achievement._id} />
        ))}
      </Container>
    </>
  );
};

export default Achievements;
