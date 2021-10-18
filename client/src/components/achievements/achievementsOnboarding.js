/**
 * The Steps component displays the different pop-ups for each onboarding message in sequence
 */

import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import { BiHelpCircle } from 'react-icons/bi';
import 'intro.js/introjs.css';

const AchievementsPageWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#add-achievement-button',
        title: 'Add Achievement',
        intro: 'Click here to add a new achievement manually',
      },
      {
        element: '#delete-team-members-icon',
        title: 'Deleting selected Achievements',
        intro: 'Click here to delete all selected achievements',
      },
      {
        element: '#select-achievements-checkbox',
        title: 'Selecting Achievements',
        intro: 'Click on this checkbox to select all achievements',
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

const AchievementsEditDeleteWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#achievement-checkbox',
        intro: 'Click on this checkbox to select the added achievement.',
        position: 'bottom',
      },
      {
        element: '#card',
        intro: 'Hover over the card to edit or delete an achievement. Icons will appear in the top right corner of the achievement header.',
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

const AchievementsFormWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#form',
        title: 'New Achievement',
        intro: 'Please ensure that: all fields are filled',
      },
      {
        element: '#achieve-title',
        title: 'Achievement Title',
        intro: 'Please ensure that the title is 3-60 characters',
      },
      {
        element: '#year',
        title: 'Achievement Year',
        intro: 'Use the drop down menu to select the year.',
      },
      {
        element: '#desc',
        title: 'Achievement Description',
        intro: 'Please ensure that the description is 5-500 characters',
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

export default AchievementsPageWalkthrough;
export { AchievementsEditDeleteWalkthrough };
export { AchievementsFormWalkthrough };
