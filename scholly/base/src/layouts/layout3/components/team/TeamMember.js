/**
 * This component display a single team member as a card component.
 */

import React from 'react';
import {
  Card,
} from 'react-bootstrap';
import profilePicture from '../../../../shared/images/profilepic.jpg';

const TeamMember = ({ member }) => (
  <>
    <div className="row mb-2" style={{ width: '87%', padding: '5px' }}>
      <div className="row g-0">
        <div className="col-md-auto">
          <Card.Img style={{ width: '160px', height: '160px' }} src={member.memberPic ? member.memberPic : profilePicture} className="team-member-picture " />
        </div>
        <div className="col teamMemberBody">
          <div className="fontx team-member-name d-block w-100 text-left">{member.fullName}</div>
          <div className="team-member-position d-block w-100 text-left">{member.position}</div>
          <div className="team-member-summary d-block w-100 text-left">{member.summary}</div>
        </div>
      </div>
    </div>
  </>
);

export default TeamMember;
