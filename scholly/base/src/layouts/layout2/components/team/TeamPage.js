/**
 * The TeamPage component displays a list of team members.
 */
import React from 'react';
import { Container, CardGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TEAM_MEMBERS, TEAM_INFO } from '../../../../global/data';
import TeamMember from './TeamMember';

const TeamPage = () => {
  const teamMembers = TEAM_MEMBERS;
  const { teamName } = TEAM_INFO;
  return (
    <>
      <Helmet>
        <title>
          {' '}
          Team -
          {' '}
          {teamName}
          {' '}
        </title>
      </Helmet>
      <Container className="pages-top-padding text-center ">
        <div className="team-pg-title">Meet Our Team</div>
      </Container>
      <Container fluid>
        <CardGroup className="d-block">
          {teamMembers.map((member) => (
            <TeamMember member={member} key={member._id} />
          ))}
        </CardGroup>
      </Container>

    </>
  );
};

export default TeamPage;
