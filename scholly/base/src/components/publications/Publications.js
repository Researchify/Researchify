/**
 * The Publications component displays a list of publications.
 */
import React, { Fragment, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import LayoutAllPublications from './publicationsLayout/LayoutAllPublications';
import LayoutByCategory from './publicationsLayout/LayoutByCategory'
import { TEAM_PUBLICATIONS } from '../../global/data';
import PublicationsDropdown from './publicationsLayout/PublicationsDropdown';
import { WEB_PAGES } from '../../global/data';
import { layoutOption } from '../../config/publications';

const Publications = () => {
  const { publicationOptions } = WEB_PAGES
  console.log(WEB_PAGES)
  console.log(publicationOptions)
  const [preference, setPreference] = useState(publicationOptions);


  
  const renderPublications = () => {
    console.log(preference)
    switch (preference.layout) {
      case layoutOption.BY_CATEGORY:
        return <LayoutByCategory teamPublications={TEAM_PUBLICATIONS}/>;
      default:
        return <LayoutAllPublications teamPublications={TEAM_PUBLICATIONS}/>;
    }
  };

  return (
    <Fragment>
      <PublicationsDropdown 
        preference={preference}
        setPreference={setPreference}
        publication={TEAM_PUBLICATIONS}
      />
      <Accordion>
        {renderPublications()}
      </Accordion>
    </Fragment>
  );
};

export default Publications;
