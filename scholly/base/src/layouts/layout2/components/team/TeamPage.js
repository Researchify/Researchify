/**
 * The TeamPage component displays a list of team members.
 */
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TEAM_MEMBERS, TEAM_INFO } from '../../../../global/data';
import ProfilePic from './ProfilePic';
import TeamMember from './TeamMember';

const TeamPage = () => {
  const teamMembers = TEAM_MEMBERS;
  const { teamName } = TEAM_INFO;
  const [hoveredMember, setHoveredMember] = useState(null);
  return (
    <>
      <Helmet>
        <title>
          {' '}
          Team -
          {' '}
          {teamName}
          {' '}
        </title>
      </Helmet>

      <Row>
        <Col md={6}>
          {
            hoveredMember && <TeamMember member={hoveredMember} />
          }
        </Col>
        <Col md={6}>
          {/* {teamMembers.map((member) => (
            <TeamMember member={member} key={member._id} />
          ))} */}

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {teamMembers.map((member) => (
              <ProfilePic member={member} key={member._id} setHoveredMember={setHoveredMember} />
            ))}
          </div>

        </Col>
      </Row>

    </>
  );
};

export default TeamPage;
