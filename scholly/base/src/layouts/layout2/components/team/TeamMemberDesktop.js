/**
 * This component display a single team member as a card component.
 */

import React from 'react';
import { Card } from 'react-bootstrap';

const TeamMemberDesktop = ({ member }) => (
  <Card.Body style={{ height: '160px' }}>
    <Card.Title as="h5">{member && member.fullName}</Card.Title>
    <Card.Text style={{ marginRight: '45px' }}><i>{member && member.position}</i></Card.Text>
    <Card.Text as="h7">
      {member && member.summary}
    </Card.Text>
  </Card.Body>
);

export default TeamMemberDesktop;
