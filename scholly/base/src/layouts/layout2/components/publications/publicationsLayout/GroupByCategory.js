/**
 * The CategoryList component displays a list of publications group by category type selcted by user
 */
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { categoryTypes } from '../../../../../shared/config/publications';
import GroupByNone from './GroupByNone';

const CategoryList = ({ teamPublications }) => {
  const renderPublicationsByCategory = (categoryType) => {
    const publicationsByCategory = teamPublications.filter(
      (pub) => pub.category.type.toUpperCase() === categoryType.toUpperCase(),
    );
    return (
      publicationsByCategory.length > 0 && (
      <Tab eventKey={categoryType} title={categoryType}>
        <GroupByNone groupBy={categoryType} teamPublications={teamPublications} />
      </Tab>
      )
    );
  };

  return (
    <Tabs className="mb-1">
      {
        Object.keys(categoryTypes).map((category) => (
          renderPublicationsByCategory(category)))
      }
    </Tabs>
  );
};

export default CategoryList;
