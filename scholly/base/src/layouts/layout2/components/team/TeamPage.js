/**
 * The TeamPage component displays a list of team members.
 */
import React from 'react';
import { Container, CardGroup } from 'react-bootstrap';
import { TEAM_MEMBERS } from '../../../../global/data';
import TeamMember from './TeamMember';

const TeamPage = () => {
  const teamMembers = TEAM_MEMBERS;
  return (
    <>
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
