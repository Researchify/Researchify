import React, { Fragment } from 'react';
import { CardDeck, Container } from 'react-bootstrap';
import TeamMember from './TeamMember';

export const TeamComponent2 = (props) => {
    const { memberData, color} = props;
  return (
    <Fragment>
      <Container className={color.primary === "black" ? "bg-dark text-white" : ""}>
        <div className="team-pg-title">Meet Our Team</div>
      </Container>
      <Container className={"team-card-container" + color.primary === "black" ? "bg-dark text-white" : ""}>
        <CardDeck className="team-card-deck">
          {memberData.map((member) => (
            <TeamMember member={member} key={member._id} />
          ))}
        </CardDeck>
      </Container>
    </Fragment>
  );
};
