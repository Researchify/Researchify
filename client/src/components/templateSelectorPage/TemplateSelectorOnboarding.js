/**
 * The Steps component displays the different pop-ups for each onboarding message in sequence
 */

import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import { BiHelpCircle } from 'react-icons/bi';
import 'intro.js/introjs.css';

const TemplateSelectorWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#darkToggle',
        title: 'Light or Dark Mode',
        intro: 'Click this toggle to switch between light or dark mode (off = light)',
      },
      {
        element: '#layout1label',
        title: 'Select a layout',
        intro: 'Select a layout to change how your website will look. Hover over a layout and click Preview to see more details.',
      },
      {
        element: '#submitButton',
        title: 'Save your changes',
        intro: 'Click this button to save your theme changes',
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
    <div style={{
      display: 'inline-block',
      marginLeft: '11px',
      position: 'relative',
      top: '-5px',
    }}
    >
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

export default TemplateSelectorWalkthrough;
