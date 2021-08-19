/**
 * The LayoutByCategory component displays a list of publications group by category type selcted by user
 */
 import React from 'react';
 import { categoryType, pageSize as configPageSize } from '../../../config/publications';
 import { TEAM_PUBLICATIONS } from '../../../global/data';
import LayoutAllPublications from './LayoutAllPublications';

 const LayoutByCategory = () => {
  const renderPublicationsByCategory = (categoryType) => {
    const publicationsByCategory = TEAM_PUBLICATIONS.filter(
      (pub) => pub.category.type === categoryType.toUpperCase()
    );
    return (
      publicationsByCategory.length > 0 && (
        <>
          <h2 className="publicationListHeader"> {categoryType} </h2>
          <LayoutAllPublications 
            teamPublications={publicationsByCategory} 
          />
        </>
      )
    );
  };
  return Object.keys(categoryType).map((category) =>
    renderPublicationsByCategory(category)
  );
};
 
 export default LayoutByCategory;
 