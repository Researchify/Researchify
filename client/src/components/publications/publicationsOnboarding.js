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
        element: '#add-publication-button',
        title: 'Add Publication(s)',
        intro: 'Click here to add a new publication by importing or manually',
      },
      {
        element: '#delete-publication-icon',
        title: 'Deleting selected publications',
        intro: 'Click here to delete all selected publications',
      },
      {
        element: '#publication-group-by',
        title: 'Selecting Achievements',
        intro: 'Click here to group all publications by none or category',
      },
      {
        element: '#publication-sort-by',
        title: 'Selecting Achievements',
        intro: 'Click here to sort all publications by title, author or year',
      },
      {
        element: '#publication-update-layout',
        title: 'Selecting Achievements',
        intro: 'Click here to update the layout of publications(sorting and group by order) in the deployed site',
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

const PublicationsEditDeleteWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#publication-checkbox',
        intro: 'Click on this checkbox to select the added publication.',
        position: 'bottom',
      },
      {
        element: '#publication-card',
        intro: 'Hover over the card to edit or delete an publication. Icons will appear in the top right corner of the publication header.',
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

const PublicationsManualFormWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#publication-title-form',
        title: 'New Publication',
        intro: 'Please ensure that all fields are filled, link is optional',
      },
      {
        element: '#publication-title',
        title: 'Publication Title',
        intro: 'Please ensure that the title is 3-60 characters',
      },
      {
        element: '#publication-year',
        title: 'Published Year',
        intro: 'Use the drop down menu to select the year.',
      },
      {
        element: '#publication-author',
        title: 'Publication Author',
        intro: 'Please enter the authors of this publication',
      },
      {
        element: '#publication-add-author',
        title: 'Add Author',
        intro: 'Click here to add an author to this publication',
      },
      {
        element: '#publication-desc',
        title: 'Publication Description',
        intro: 'Enter the description of the publication',
      },
      {
        element: '#publication-link',
        title: 'Publication Link',
        intro: 'Please ensure a valid link to this publication is provided',
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

const PublicationsManualCategoryFormWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#publication-category',
        title: 'New Publication',
        intro: 'Select the category of your publication',
      },
      {
        element: '#publication-category-title',
        title: 'Publication Category Title',
        intro: 'Please ensure that the title is 3-60 characters',
      },
      {
        element: '#publication-volume',
        title: 'Published Volume',
        intro: 'Please ensure that the volume of the publication is a number',
      },
      {
        element: '#publication-issue',
        title: 'Publication Issue',
        intro: 'Please ensure that the issue of the publication is a number',
      },
      {
        element: '#publication-pages',
        title: 'Publication Pages',
        intro: 'Please ensure that the pages of the publication is a number',
      },
      {
        element: '#publication-publisher',
        title: 'Publication Publisher',
        intro: 'Enter the publisher of the publication',
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

const PublicationsImportFormWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#import-publication-link',
        title: 'Import Publication',
        intro: 'Import your publication(s) by providing a valid Google Scholar link',
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
export { PublicationsManualFormWalkthrough };
export { PublicationsEditDeleteWalkthrough };
export { PublicationsManualCategoryFormWalkthrough };
export { PublicationsImportFormWalkthrough };
