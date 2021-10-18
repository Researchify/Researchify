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
        title: 'Deleting selected Team Members from Research Group',
        intro: 'Click here to delete all selected team members',
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

export default TeamPageWalkthrough;
