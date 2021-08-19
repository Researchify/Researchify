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

  const allSorting = {
    byTitle: 'Title',
    byAuthor: 'Author',
    byYear: 'Year'
  }

  const [layout, setLayout] = useState(allLayouts.allPublications);
  const [sortBy, setsortBy] = useState(allSorting.byTitle);

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
      <PublicationsDropdown 
        allLayouts={allLayouts}
        layout={layout}
        setLayout={setLayout}
        allSorting={allSorting}
        sortBy={sortBy}
        setsortBy={setsortBy}
        publication={TEAM_PUBLICATIONS}
      />
      <Accordion>
        {renderPublications()}
      </Accordion>
    </Fragment>
  );
};

export default Publications;
