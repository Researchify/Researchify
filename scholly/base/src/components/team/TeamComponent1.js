import React, { Fragment } from 'react';
import { CardDeck, Container } from 'react-bootstrap';
import TeamMember from './TeamMember';

export const TeamComponent1 = (props) => {
  const { color, memberData } = props;

  return (
    <Fragment>
      <Container className="pages-top-padding text-center mt-3 mb-3">
        <div className="team-pg-title">Meet Our Team</div>
      </Container>
      <Container fluid className="team-card-container">
        <CardDeck className="team-card-deck">
          {memberData.map((member) => (
            <TeamMember member={member} key={member._id} />
          ))}
        </CardDeck>
      </Container>
    </Fragment>
  );
};
