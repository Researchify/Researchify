/**
 * This component display a single award as a card component.
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import { TEAM_AWARDS } from '../../../../global/data';
import profilePicture from '../../../../shared/images/awardpic.jpg';

const teamAwards = TEAM_AWARDS;

const Awards = ({ award }) => (
  <Card style={{ display: 'flex', flexDirection: teamAwards.indexOf(award) % 2 === 0 ? 'row' : 'row-reverse' }} className="team-card">
    <Card.Img style={{ width: '210px' }} variant="top" src={profilePicture} />
    <Card.Body>
      <div className="award-name">{award.fullName}</div>
      <div className="award-position">{award.position}</div>
      <div className="award-summary">{award.summary}</div>
    </Card.Body>
  </Card>
);

export default Awards;
