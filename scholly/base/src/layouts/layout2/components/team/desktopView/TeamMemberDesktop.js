/**
 * This component display a single team member as a card component.
 */

import React, { useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import ProfilePic from './ProfilePic';
import { TEAM_INFO } from '../../../../../global/data';

const TeamMemberDesktop = ({ teamMembers }) => {
  const { profilePic } = TEAM_INFO;
  const [hoveredMember, setHoveredMember] = useState(null);
  const handleMouseOver = (currentMember) => {
    setHoveredMember(currentMember);
  };
  const handleMouseLeave = () => {
    setHoveredMember(null);
  };
  return (
    <div style={{
      margin: 'auto', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap',
    }}
    >
      <div>
        {hoveredMember ? (
          <Card.Body style={{ height: '180px', width: '490px' }}>
            <Card.Title as="h5">{hoveredMember.fullName}</Card.Title>
            <Card.Text><i>{hoveredMember.position}</i></Card.Text>
            <Card.Text as="h7">
              {hoveredMember.summary}
            </Card.Text>
          </Card.Body>
        ) : (
          <div style={{
            display: 'flex', justifyContent: 'center', height: '180px', width: '490px',
          }}
          >
            <Image
              style={{
                width: 'auto', height: 'auto',
              }}
              src={profilePic}
            />
          </div>
        )}
      </div>
      {teamMembers.map((member, index) => (
        <div
          onMouseOver={() => handleMouseOver(member)}
          onFocus={() => handleMouseOver(member)}
          onMouseLeave={handleMouseLeave}
          onBlur={handleMouseLeave}
          style={{ paddingBottom: '6px', paddingRight: '6px' }}
        >
          <ProfilePic member={member} key={index} hoveredMember={hoveredMember} setHoveredMember={() => setHoveredMember} />
        </div>
      ))}
    </div>
  );
};

export default TeamMemberDesktop;
