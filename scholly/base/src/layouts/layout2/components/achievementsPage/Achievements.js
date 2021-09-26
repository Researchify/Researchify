/**
 * The TeamPage component displays a list of team members.
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { ListGroup, Container } from 'react-bootstrap';
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
        <ListGroup style={{ width: '100%', boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)' }}>
          {teamAchievements.map((achievement) => (
            <Achievement achievement={achievement} key={achievement._id} />
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default Achievements;
