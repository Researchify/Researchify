/**
 * This component display a single award as a card component.
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import { TEAM_ACHIEVEMENTS } from '../../../../global/data';
import profilePicture from '../../../../shared/images/awardpic.jpg';

const teamAchievements = TEAM_ACHIEVEMENTS;

const Achievement = ({ achievement }) => (
  <Card style={{ display: 'flex', flexDirection: teamAchievements.indexOf(achievement) % 2 === 0 ? 'row' : 'row-reverse' }} className="team-card">
    <Card.Img style={{ width: '210px' }} variant="top" src={profilePicture} />
    <Card.Body>
      <div className="award-name">{achievement.title}</div>
      <div className="award-position">{achievement.yearAwarded}</div>
      <div className="award-summary">{achievement.description}</div>
    </Card.Body>
  </Card>
);

export default Achievement;
