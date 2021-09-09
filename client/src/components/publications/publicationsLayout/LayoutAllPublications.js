/**
 * The LayoutAllPublications component displays a list of publications
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';

const LayoutAllPublications = ({ teamPublications, pageSize }) => {
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

LayoutAllPublications.propTypes = {
  teamPublications: PropTypes.isRequired,
  pageSize: PropTypes.isRequired,
};

export default LayoutAllPublications;
