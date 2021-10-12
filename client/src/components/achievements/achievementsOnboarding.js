/* eslint-disable react/button-has-type */
/* add new, delete, edit */
import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import { BiHelpCircle } from 'react-icons/bi';

const AchievementsPageWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#add-achievement-button',
        title: 'Add Achievement',
        intro: 'Click on this to add a new achievement manually',
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
    stepsEnabled: true,
    initialStep: 0,
    steps: [
      {
        element: '#three-dot-icon',
        title: 'Edit/Delete',
        intro: 'Click on this button to edit or delete the added publication',
      },
    ],
  });

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
        intro: 'Please ensure that the year entered is valid.',
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
