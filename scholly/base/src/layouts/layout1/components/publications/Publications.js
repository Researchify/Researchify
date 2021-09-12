/**
 * The Publications component displays a list of publications.
 */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import Publication from './publication/Publication';
import { TEAM_PUBLICATIONS, WEB_PAGES } from '../../../../global/data';
import usePagination from '../../../../shared/usePagination';
import { pageSize } from '../../../../shared/config/publications';

const Publications = () => {
  const teamPublications = TEAM_PUBLICATIONS;
  const options = WEB_PAGES.publicationOptions;
  const publications = sortPublications(TEAM_PUBLICATIONS, options.sortBy);
  const { currentData, pagination } = usePagination(teamPublications, pageSize);

  const renderPublications = () => {
    switch (options.layout) {
      case layoutOptions.BY_CATEGORY:
        return <LayoutByCategory teamPublications={publications} />;
      default:
        return <LayoutAllPublications teamPublications={publications} />;
    }
  };

  return (
    <>
      <Accordion>
        {renderPublications()}
      </Accordion>
    </>
  );
};

export default Publications;
