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
import { layoutOption, sortingOption, defaultOption } from '../../config/publications';

const Publications = () => {
  const { publicationOptions } = WEB_PAGES
  const [ options, setOptions ] = useState(publicationOptions ? publicationOptions : defaultOption);
  const sortPublications = (teamPublications, option) => {
    switch (option) {
        case sortingOption.AUTHOR:
            teamPublications.sort((a, b) =>
                a.authors[0].toLowerCase() > b.authors[0].toLowerCase() ? 1 : -1
            );
            break;
        case sortingOption.TITLE:
            // publication title
            teamPublications.sort((a, b) =>
                a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
            );
            break;
        case 'Category Title':
            // journal or conference title
            teamPublications.sort((a, b) =>
                a.category.categoryTitle.toLowerCase() >
                b.category.categoryTitle.toLowerCase()
                ? 1
                : -1
            );
            break;
        default:
            // sort by title then year for consistency with the db
            teamPublications.sort((a, b) =>
                a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
            );
            teamPublications.sort((a, b) => (a.year > b.year ? -1 : 1));
            break;
        }
        return teamPublications
    };
  const publications = sortPublications(TEAM_PUBLICATIONS, options.sortBy);

  const renderPublications = () => {
    switch (options.layout) {
      case layoutOption.BY_CATEGORY:
        return <LayoutByCategory teamPublications={TEAM_PUBLICATIONS}/>;
      default:
        return <LayoutAllPublications teamPublications={TEAM_PUBLICATIONS}/>;
    }
  };

  return (
    <Fragment>
      <PublicationsDropdown 
        options={options}
        setOptions={setOptions}
        publications={publications}
        sortPublications={sortPublications}
      />
      <Accordion>
        {renderPublications()}
      </Accordion>
    </Fragment>
  );
};

export default Publications;
