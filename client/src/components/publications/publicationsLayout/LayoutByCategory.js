/**
 * The LayoutByCategory component displays a list of publications group by category type selcted by user
 */

import { categoryType } from '../../../config/publications';
import LayoutAllPublications from './LayoutAllPublications';
import { categoryPageSize } from '../../../config/publications';

const LayoutByCategory = ({ teamPublications }) => {
  const renderPublicationsByCategory = (categoryType) => {
    const publicationsByCategory = teamPublications.filter(
      (pub) => pub.category.type === categoryType.toUpperCase()
    );
    return (
      publicationsByCategory.length > 0 && (
        <>
          <h2 className="publicationListHeader"> {categoryType} </h2>
          <LayoutAllPublications 
            teamPublications={publicationsByCategory} 
            pageSize={categoryPageSize}
          />
        </>
      )
    );
  };
  return Object.keys(categoryType).map((category, i) =>
    <div key={i}>
      {renderPublicationsByCategory(category)}
    </div>
  );
};

export default LayoutByCategory;
