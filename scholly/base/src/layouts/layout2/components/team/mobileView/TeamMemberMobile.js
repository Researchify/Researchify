/**
 * This component display a single team member as a card component.
 */

import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import profilePicture from '../../../../../shared/images/profilepic.jpg';

const TeamMemberMobile = ({ teamMembers }) => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const handleMouseOver = (index) => {
    setHoveredMember(index);
  };
  const handleMouseLeave = () => {
    setHoveredMember(null);
  };

  return (
    teamMembers.map((member, index) => (
      <Card
        style={{
          marginBottom: '5px',
          width: '100%',
          height: 'auto',
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
          backgroundColor: hoveredMember === index ? 'var(--researchify-color-tertiary)' : 'var(--researchify-color-secondary)',
        }}
        onMouseOver={() => handleMouseOver(index)}
        onFocus={() => handleMouseOver(index)}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ height: 'auto', minWidth: '150px' }}>
            <Card.Img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={profilePicture} />
          </div>
          <Card.Body>
            <Card.Title style={{ fontSize: '17px' }}>{member.fullName}</Card.Title>
            <Card.Text style={{ fontSize: '16px' }}>{member.position}</Card.Text>
            <Card.Text style={{ fontSize: '14px', color: hoveredMember === index ? 'var(--researchify-text-color)' : 'var(--researchify-text-color-secondary)' }}>
              {member.summary}
            </Card.Text>
          </Card.Body>
        </div>
      </Card>
    ))
  );
};

export default TeamMemberMobile;
