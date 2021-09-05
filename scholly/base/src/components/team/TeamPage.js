/**
 * The TeamPage component displays a list of team members.
 */
import React, { Fragment } from 'react';
import { CardDeck, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TEAM_MEMBERS, WEB_PAGES } from '../../global/data';
import TeamMember from './TeamMember';

const TeamPage = () => {
  const teamMembers = TEAM_MEMBERS;
  const { title } = WEB_PAGES;
  return (
    <>
      <Helmet>
        <title>
          {' '}
          {title}
          {' '}
          - Team
          {' '}
        </title>
      </Helmet>
      <Container className="pages-top-padding text-center mt-3 mb-3">
        <div className="team-pg-title">Meet Our Team</div>
      </Container>
      <Container fluid className="team-card-container">
        <CardDeck className="team-card-deck">
          {teamMembers.map((member) => (
            <TeamMember member={member} key={member._id} />
          ))}
        </CardDeck>
      </Container>
    </>
  );
};

export default TeamPage;
