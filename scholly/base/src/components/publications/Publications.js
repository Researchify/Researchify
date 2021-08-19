/**
 * The Publications component displays a list of publications.
 */
import React, { Fragment, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import LayoutAllPublications from './publicationsLayout/LayoutAllPublications';
import LayoutByCategory from './publicationsLayout/LayoutByCategory'
import { TEAM_PUBLICATIONS } from '../../global/data';
import PublicationsDropdown from './publicationsLayout/PublicationsDropdown';

const Publications = () => {
  const allLayouts = {
    allPublications: 'All Publications',
    byCategory: 'By Category',
  };

  const [layout, setLayout] = useState(allLayouts.allPublications);

  const renderPublications = () => {
    switch (layout) {
      case allLayouts.byCategory:
        return <LayoutByCategory teamPublications={TEAM_PUBLICATIONS}/>;
      default:
        return <LayoutAllPublications teamPublications={TEAM_PUBLICATIONS}/>;
    }
  };

  return (
    <Fragment>
      <PublicationsDropdown allLayouts={allLayouts} layout={layout} setLayout={setLayout}/>
      <Accordion>
        {renderPublications()}
      </Accordion>
    </Fragment>
  );
};

export default Publications;
