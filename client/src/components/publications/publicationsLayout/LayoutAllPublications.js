/**
 * The LayoutAllPublications component displays a list of publications
 */
import React from 'react';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';

const LayoutAllPublications = ({ teamPublications, pageSize, groupBy = null }) => {
  const { currentData, pagination } = usePagination(teamPublications, pageSize || configPageSize);
  return (
    <>
      <div className="publicationList">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>
            {' '}
            {groupBy || ' '}
            {' '}
          </h5>
          { pagination() }
        </div>
        {
        currentData().map((pub) => (
          <Publication pub={pub} key={pub._id} />))
      }
      </div>
    </>
  );
};

export default LayoutAllPublications;
