/**
 * The LayoutAllPublications component displays a list of publications
 */
import React, { Fragment } from 'react';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';

const LayoutAllPublications = ({ teamPublications, pageSize }) => {
  const { currentData, pagination } = usePagination(teamPublications, pageSize ? pageSize : configPageSize)
  return (
    <Fragment>
      <div className="publicationList">
      {
        currentData().map((pub) => (
          <Publication pub={pub} key={pub._id} />))
      }
      </div>
      { pagination() }
    </Fragment>
  );
};

export default LayoutAllPublications;
