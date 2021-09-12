/**
 * This component display a single team member as a card component.
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import profilePicture from '../../../../shared/images/profilepic.jpg';
import { TEAM_MEMBERS } from '../../../../global/data';

const teamMembers = TEAM_MEMBERS;

const TeamMember = ({ member }) => (
  <Card style={{ display: 'flex', flexDirection: teamMembers.indexOf(member) % 2 === 0 ? 'row' : 'row-reverse' }} className="team-card">
    <Card.Img style={{ width: '210px' }} variant="top" src={profilePicture} />
    <Card.Body>
      <div className="member-name">{member.fullName}</div>
      <div className="member-position">{member.position}</div>
      <div className="member-summary">{member.summary}</div>
    </Card.Body>
  </Card>
);

export default TeamMember;
