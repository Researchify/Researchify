/**
 * This component display a single award as a card component.
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import profilePicture from '../../../../shared/images/awardpic.jpg';

const Achievement = ({ achievement }) => (
  <Card className="award-card">
    <Card.Img variant="top" src={profilePicture} />
    <Card.Body>
      <div className="award-name">{achievement.title}</div>
      <div className="award-position">{achievement.yearAwarded}</div>
      <div className="award-summary">{achievement.description}</div>
    </Card.Body>
  </Card>
);

export default Achievement;
