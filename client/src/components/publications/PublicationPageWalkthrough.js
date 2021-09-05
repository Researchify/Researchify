/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Steps } from 'intro.js-react';

const PublicationPageWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: true,
    initialStep: 0,
    steps: [
      {
        element: '#add-pub-button',
        intro: 'Click on this to add new publication manually',
      },
      {
        element: '#import-pub-button',
        intro: 'Click on this to import publication from google scholar',
      },
      {
        element: '#publication-options',
        intro: 'Select different layout and sorting preference',
        position: 'right',
      },
      {
        element: '#publication-options',
        intro: 'Click to edit or delete publication',
      },
      {
        element: '.world',
        intro: 'Click on this to view the tutorial again',
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
      <button className="world" onClick={toggleSteps}>Start Tutorial</button>
    </div>
  );
};

export default PublicationPageWalkthrough;
