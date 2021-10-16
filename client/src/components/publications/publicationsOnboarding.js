/**
 * The Steps component displays the different pop-ups for each onboarding message in sequence
 */

import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import { BiHelpCircle } from 'react-icons/bi';
import 'intro.js/introjs.css';

const PublicationsPageWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#add-achievement-button',
        title: 'Add Publication(s)',
        intro: 'Click here to add a new publication',
      },
      {
        element: '#delete-icon',
        title: 'Deleting selected publications',
        intro: 'Click here to delete all selected publications',
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

export default PublicationsPageWalkthrough;
