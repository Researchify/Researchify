import React from 'react';
import { Image, ListGroup } from 'react-bootstrap';
import profilePicture from '../../../../../shared/images/profilepic.jpg';

const ProfilePic = ({ member, hoveredMember }) => (
  <ListGroup
    style={{
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    }}
  >
    <ListGroup.Item
      style={{
        padding: '5px', height: '180px', width: '157px', backgroundColor: 'var(--researchify-color-secondary',
      }}
    >
      <Image
        alt="img"
        style={{
          width: '100%', height: '90%', objectFit: 'cover', filter: hoveredMember !== member && 'opacity(60%)',
        }}
        src={profilePicture}
      />
      <div style={{
        position: 'absolute', left: '16px', color: hoveredMember === member ? 'var(--researchify-text-color)' : 'var(--researchify-text-color-secondary)',
      }}
      >
        {member.fullName}
      </div>
    </ListGroup.Item>
  </ListGroup>
);
export default ProfilePic;
