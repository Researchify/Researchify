/**
 * The Publications component displays a list of publications.
 */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import GroupByCategory from './publicationLayout/GroupByCategory';
import GroupByNone from './publicationLayout/GroupByNone';
import { TEAM_PUBLICATIONS, TEAM_SITE_METADATA } from '../../../../global/data';
import sortPublications from '../../../../shared/sortPublications';
import { groupByOptions } from '../../../../shared/config/publications';

const Publications = () => {
  const { publicationOptions } = TEAM_SITE_METADATA;
  const publications = sortPublications(TEAM_PUBLICATIONS, publicationOptions.sortBy);

  const renderPublications = () => {
    switch (publicationOptions.groupBy) {
      case groupByOptions.CATEGORY:
        return <GroupByCategory teamPublications={publications} />;
      default:
        return <GroupByNone teamPublications={publications} />;
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
