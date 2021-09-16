/**
 * The GroupByCategory component displays a list of publications group by category type selcted by user
 */

import { categoryTypes, categoryPageSize } from '../../../config/publications';
import GroupByNone from './GroupByNone';

const GroupByCategory = ({ teamPublications }) => {
  const renderPublicationsByCategory = (categoryType) => {
    const publicationsByCategory = teamPublications.filter(
      (pub) => pub.category.type === categoryType,
    );
    return (
      publicationsByCategory.length > 0 && (
      <GroupByNone
        teamPublications={publicationsByCategory}
        pageSize={categoryPageSize}
        groupBy={categoryType}
        setCheckedPublications={setCheckedPublicationId}
      />
      )
    );
  };
  return Object.keys(categoryTypes).map((category) => (
    <div key={category}>
      {renderPublicationsByCategory(category)}
    </div>
  ));
};

export default GroupByCategory;
