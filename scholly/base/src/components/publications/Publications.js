/**
 * The Publications component displays a list of publications.
 */
import React, { Fragment } from 'react';
import { Accordion } from 'react-bootstrap';
import LayoutAllPublications from './publicationsLayout/LayoutAllPublications';
import LayoutByCategory from './publicationsLayout/LayoutByCategory'
import { TEAM_PUBLICATIONS } from '../../global/data';
import { WEB_PAGES } from '../../global/data';
import { layoutOptions, sortingOptions } from '../../config/publications';

const Publications = () => {
  const { publicationOptions } = WEB_PAGES
  const sortPublications = (publicationToBeSorted, option) => {
    switch (option) {
      case sortingOptions.AUTHOR:
        publicationToBeSorted.sort((a, b) => {
          if (a.authors[0].toLowerCase() > b.authors[0].toLowerCase()) return 1;
          if (a.authors[0].toLowerCase() < b.authors[0].toLowerCase()) return -1;
          return 0;
        });
        break;
      case sortingOptions.TITLE:
        // publication title
        publicationToBeSorted.sort((a, b) => {
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          return 0;
        });
        break;
      case 'Category Title':
        // journal or conference title
        publicationToBeSorted.sort((a, b) => {
          if (a.category.categoryTitle.toLowerCase() > b.category.categoryTitle.toLowerCase()) return 1;
          if (a.category.categoryTitle.toLowerCase() < b.category.categoryTitle.toLowerCase()) return -1;
          return 0;
        });
        break;
      default:
        // sort by title then year for consistency with the db
        publicationToBeSorted.sort((a, b) => {
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          return 0;
        });
        publicationToBeSorted.sort((a, b) => {
          if (a.year > b.year) return 1;
          if( a.year < b.year) return -1;
          return 0;
        });
        break;
      }
      return publicationToBeSorted
    };
  const publications = sortPublications(TEAM_PUBLICATIONS, publicationOptions.sortBy);

  const renderPublications = () => {
    switch (publicationOptions.layout) {
      case layoutOptions.BY_CATEGORY:
        return <LayoutByCategory teamPublications={publications}/>;
      default:
        return <LayoutAllPublications teamPublications={publications}/>;
    }
  };

  return (
    <Fragment>
      <Accordion>
        {renderPublications()}
      </Accordion>
    </Fragment>
  );
};

export default Publications;
