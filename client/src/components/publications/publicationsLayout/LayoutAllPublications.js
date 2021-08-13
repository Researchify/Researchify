/**
 * The LayoutAllPublications component displays a list of publications
 */
import React from 'react';
import MyPagination from '../../shared/MyPagination';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';

const LayoutAllPublications = ({ teamPublications }) => {
  const { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage} = usePagination(teamPublications, 5)
  return (
    <>
      <div className="publicationList">
        {
          currentData().map((pub) => (
            <Publication pub={pub} key={pub._id} />
          ))
        }
      </div>
      <MyPagination 
        maxPage={maxPage} 
        nextPage={nextPage}
        prevPage={prevPage}
        jumpToPage={jumpToPage}
        currentPage={currentPage}
      /> 
    </>
  );
};

export default LayoutAllPublications;
