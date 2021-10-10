/**
 * The TeamPage component displays a list of team members.
 */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { TEAM_MEMBERS, TEAM_INFO } from '../../../../global/data';
import TeamMemberDesktop from './desktopView/TeamMemberDesktop';
import TeamMemberMobile from './mobileView/TeamMemberMobile';

const TeamPage = () => {
  const [width, setWidth] = useState(0);
  const teamMembers = TEAM_MEMBERS;
  const { teamName } = TEAM_INFO;

  const updateDimensions = () => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    setWidth(windowWidth);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Team -
          {' '}
          {teamName}
          {' '}
        </title>
      </Helmet>
      {
        width > 768
          ? <TeamMemberDesktop teamMembers={teamMembers} />
          : <TeamMemberMobile teamMembers={teamMembers} />
      }
    </>
  );
};

export default TeamPage;
