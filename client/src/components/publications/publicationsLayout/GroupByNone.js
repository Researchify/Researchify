/**
 * The GroupByNone component displays a list of publications
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';

const GroupByNone = ({ teamPublications, pageSize }) => {
  const { currentData, pagination } = usePagination(teamPublications, pageSize || configPageSize);
  return (
    <>
      <div className="publicationList">
        {
        currentData().map((pub) => (
          <Publication pub={pub} key={pub._id} />))
      }
      </div>
      { pagination() }
    </>
  );
};

// props validation
GroupByNone.propTypes = {
  teamPublications: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
};
GroupByNone.defaultProps = {
  pageSize: 10,
};

export default GroupByNone;
