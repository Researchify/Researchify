/**
 * The TeamPage component displays a list of team members.
 */
import React from 'react';
import { TEAM_MEMBERS } from '../../global/data';
import { TeamComponent1 } from './TeamComponent1';
import { TeamComponent2 } from './TeamComponent2';

const teamComponents = {
  1: TeamComponent1,
  2: TeamComponent2,
}

const TeamPage = () => {
  const teamMembers = TEAM_MEMBERS;
  const Component = teamComponents[2];

  const colors = {
    "primary": "black",
    "secondary": "#00446"
  };

  return <Component memberData={teamMembers} color={colors}></Component>
};

export default TeamPage;
