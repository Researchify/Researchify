/**
 * This component display a single team member as a card component.
 */

import React from 'react';
import {Card} from 'react-bootstrap';
import profilePicture from '../../../../shared/images/profilepic.jpg';

const TeamMember = ({member}) => {
  return (
    <Card className="team-card">
      <Card.Img variant="top" src={profilePicture} />
      <Card.Body>
      <div className="member-name">{member.fullName}</div>
      <div className="member-position">{member.position}</div>
      <div className="member-summary">{member.summary}</div>
      </Card.Body>
    </Card>
  )
}

export default TeamMember;
