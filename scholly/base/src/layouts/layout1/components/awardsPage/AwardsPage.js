/**
 * The TeamPage component displays a list of team members.
 */
import React, { Fragment } from 'react';
import { CardDeck, Container } from 'react-bootstrap';
import { TEAM_AWARDS } from '../../../../../global/data';
import Awards from './Awards';

const AwardsPage = () => {
  const teamAwards = TEAM_AWARDS;
  return (
    <Fragment>
      <Container className="pages-top-padding text-center mt-3 mb-3">
        <div className="team-pg-title">Awards</div>
      </Container>
      <Container fluid className="team-card-container">
        <CardDeck className="team-card-deck">
          {teamAwards.map((award, i) => (
            <Awards style={{display: "flex", flexDirection: i % 2 === 0 ? "row" : "row-reverse"}} award={award} key={award._id} />
          ))}
        </CardDeck>
      </Container>
    </Fragment>
  );
};

export default AwardsPage;
