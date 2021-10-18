/**
 * This page contains the code for team page onboarding
 */

import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import { BiHelpCircle } from 'react-icons/bi';
import 'intro.js/introjs.css';

const TeamPageWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#add-team-member-button',
        title: 'Add a New Team Member',
        intro: 'Click here to add a new team member manually',
      },
      {
        element: '#delete-team-members-button',
        title: 'Deleting selected Team Members',
        intro: 'Click here to delete all selected team members from Research Group',
      },
      {
        element: '#select-team-members-checkbox',
        title: 'Selecting Team Members',
        intro: 'Click on this checkbox to select all team members',
      },
    ],
  });

  const toggleSteps = () => {
    setIntro({ ...intro, stepsEnabled: !intro.stepsEnabled });
  };

  const onExit = () => {
    setIntro({ ...intro, stepsEnabled: false });
  };

  return (
    <div>
      <Steps
        enabled={intro.stepsEnabled}
        steps={intro.steps}
        initialStep={intro.initialStep}
        onExit={onExit}
      />
      <BiHelpCircle onClick={toggleSteps} />
    </div>
  );
};

const TeamsFormWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#team-member-form-fullname',
        title: 'Name of team member',
        intro: 'Please ensure that: all fields are filled',
      },
      {
        element: '#team-member-form-position',
        title: 'Position of team member',
        intro: 'Please ensure that the position of the team member is 3-60 characters',
      },
      {
        element: '#team-member-form-summary',
        title: 'Team member summary',
        intro: 'Please ensure that the summary of the team member is 5-500 characters',
      },
      {
        element: '#team-member-form-photo',
        title: 'Team member photo',
        intro: 'Please ensure that the photo is uploaded',
      },
    ],
  });

  const toggleSteps = () => {
    setIntro({ ...intro, stepsEnabled: !intro.stepsEnabled });
  };

  const onExit = () => {
    setIntro({ ...intro, stepsEnabled: false });
  };

  return (
    <div>
      <Steps
        enabled={intro.stepsEnabled}
        steps={intro.steps}
        initialStep={intro.initialStep}
        onExit={onExit}
      />
      <BiHelpCircle onClick={toggleSteps} />
    </div>
  );
};
const TeamMembersEditDeleteWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#team-member-select-checkbox',
        intro: 'Click on this checkbox to select the team member.',
        position: 'bottom',
      },
      {
        element: '#team-card',
        intro: 'Hover over the card to edit or delete the team member. Icons will appear in the top right corner of the team member header.',
        position: 'right',
      },
    ],
  });

  const toggleSteps = () => {
    setIntro({ ...intro, stepsEnabled: !intro.stepsEnabled });
  };

  const onExit = () => {
    setIntro({ ...intro, stepsEnabled: false });
  };

  return (
    <div>
      <Steps
        enabled={intro.stepsEnabled}
        steps={intro.steps}
        initialStep={intro.initialStep}
        onExit={onExit}
      />
      <BiHelpCircle onClick={toggleSteps} />
    </div>
  );
};

export default TeamPageWalkthrough;
export { TeamMembersEditDeleteWalkthrough };
export { TeamsFormWalkthrough };
