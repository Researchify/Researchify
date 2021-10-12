/* eslint-disable react/button-has-type */
/* add new, delete, edit */
import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import { SiProbot } from 'react-icons/si';
import { GoldButton } from '../shared/styledComponents';

const AchievementsPageWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: true,
    initialStep: 0,
    steps: [
      {
        element: '#add-achievement-button',
        intro: 'Click on this to add a new achievement manually',
      },
    ],
    hintsEnabled: false,
    hints: [
      {
        element: '.hello',
        hint: 'Hello hint',
        hintPosition: 'middle-right',
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
      <GoldButton onClick={toggleSteps}>
        <SiProbot />
      </GoldButton>
    </div>
  );
};

export default AchievementsPageWalkthrough;
