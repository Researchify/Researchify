/**
 * This component display a single award as a card component.
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import profilePicture from '../../../../shared/images/awardpic.jpg';

const Awards = ({ award }) => (
  <Card className="award-card">
    <Card.Img variant="top" src={profilePicture} />
    <Card.Body>
      <div className="award-name">{award.fullName}</div>
      <div className="award-position">{award.position}</div>
      <div className="award-summary">{award.summary}</div>
    </Card.Body>
  </Card>
);

export default Awards;
