import React, { useState } from 'react';
import { Image, ListGroup } from 'react-bootstrap';
import profilePicture from '../../../../shared/images/profilepig.jpg';

const ProfilePic = ({ member, setHoveredMember }) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
    setHoveredMember(member);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <ListGroup
      style={{
        marginRight: '10px',
        marginBottom: '10px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      }}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
    >
      <ListGroup.Item style={{ height: '180px', width: '155px' }}>
        <Image alt="img" style={{ maxWidth: '100%', minheight: 'auto', filter: !isHovering && 'opacity(50%)' }} src={profilePicture} />
        <div style={{ position: 'absolute', bottom: '8px', left: '16px' }}>
          {member.fullName}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};
export default ProfilePic;
