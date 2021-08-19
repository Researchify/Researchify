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
  const [teamPublications, setTeamPublications] = useState(TEAM_PUBLICATIONS);

  const [layout, setLayout] = useState(allLayouts.allPublications);

  const renderPublications = () => {
    switch (layout) {
      case allLayouts.byCategory:
        return <LayoutByCategory teamPublications={teamPublications}/>;
      default:
        return <LayoutAllPublications teamPublications={teamPublications}/>;
    }
  };

  return (
    <Fragment>
      <PublicationsDropdown 
        allLayouts={allLayouts} 
        layout={layout} 
        setLayout={setLayout} 
        setTeamPublications={setTeamPublications}
        teamPublications={teamPublications}
      />
      <Accordion>
        {renderPublications()}
      </Accordion>
    </Fragment>
  );
};

export default Publications;
