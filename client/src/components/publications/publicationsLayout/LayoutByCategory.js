/**
 * The LayoutByCategory component displays a list of publications group by category type selcted by user
 */

import { categoryTypes, categoryPageSize } from '../../../config/publications';
import LayoutAllPublications from './LayoutAllPublications';

const LayoutByCategory = ({ teamPublications, setCheckedPublicationId }) => {
  const renderPublicationsByCategory = (categoryType) => {
    const publicationsByCategory = teamPublications.filter(
      (pub) => pub.category.type === categoryType,
    );
    return (
      publicationsByCategory.length > 0 && (
      <LayoutAllPublications
        teamPublications={publicationsByCategory}
        pageSize={categoryPageSize}
        groupBy={categoryType}
        setCheckedPublications={setCheckedPublicationId}
      />
      )
    );
  };
  return Object.keys(categoryTypes).map((category, i) => (
    <div key={i}>
      {renderPublicationsByCategory(category)}
    </div>
  ));
};

export default LayoutByCategory;
