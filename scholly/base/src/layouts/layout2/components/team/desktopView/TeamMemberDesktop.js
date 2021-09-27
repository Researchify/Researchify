/**
 * This component display a single team member as a card component.
 */

import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import ProfilePic from './ProfilePic';

const TeamMemberDesktop = ({ teamMembers }) => {
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
        {
          hoveredMember
            ? (
              <Card.Body style={{ height: '180px', width: '490px' }}>
                <Card.Title as="h5">{hoveredMember.fullName}</Card.Title>
                <Card.Text><i>{hoveredMember.position}</i></Card.Text>
                <Card.Text as="h7">
                  {hoveredMember.summary}
                </Card.Text>
              </Card.Body>
            )
            : (
              <div style={{ height: '180px', width: '490px', paddingRight: '15px' }}>
                <h2> Space for group logo/ recruitment news?? </h2>
              </div>
            )
        }
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
