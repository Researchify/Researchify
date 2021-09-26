/**
 * The TeamPage component displays a list of team members.
 */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import { TEAM_MEMBERS, TEAM_INFO } from '../../../../global/data';
import ProfilePic from './ProfilePic';
// import TeamMemberMobile from './TeamMemberMobile';
import TeamMemberDesktop from './TeamMemberDesktop';

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
      <Container fluid>
        <div style={{ margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>
          {teamMembers.slice(0, 3).map((member) => (
            <ProfilePic member={member} key={member._id} setHoveredMember={setHoveredMember} />
          ))}
          {teamMembers.map((member) => (
            <ProfilePic member={member} key={member._id} setHoveredMember={setHoveredMember} />
          ))}

        </div>
        <TeamMemberDesktop member={hoveredMember} />
      </Container>

    </>
  );
};

export default TeamPage;
