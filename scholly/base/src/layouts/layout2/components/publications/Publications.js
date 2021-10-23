/**
 * The Publications component displays a list of publications.
 */
import React from 'react';
import GroupByCategory from './publicationsLayout/GroupByCategory';
import GroupByNone from './publicationsLayout/GroupByNone';
import { TEAM_PUBLICATIONS, TEAM_SITE_METADATA } from '../../../../global/data';
import { groupByOptions } from '../../../../shared/config/publications';
import sortPublications from '../../../../shared/sortPublications';

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
      {renderPublications()}
    </>
  );
};

export default Publications;
