/**
 * The GroupByNone component displays a list of publications
 */
import React from 'react';
import Publication from '../publication/Publication';

const GroupByNone = ({ teamPublications, groupBy }) => (
  <div className="mb-5">
    {
        groupBy
          ? teamPublications.filter((pub) => pub.category.type.toUpperCase() === groupBy.toUpperCase()).map((pub) => (
            <Publication pub={pub} key={pub._id} />))
          : teamPublications.map((pub) => (
            <Publication pub={pub} key={pub._id} />))
      }
  </div>
);
export default GroupByNone;
