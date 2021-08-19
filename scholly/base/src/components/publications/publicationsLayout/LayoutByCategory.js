/**
 * The LayoutByCategory component displays a list of publications group by category type selcted by user
 */
 import React from 'react';
 import usePagination from '../../shared/usePagination';
 import Publication from '../publication/Publication';
 import { pageSize as configPageSize } from '../../../config/publications';
 
 const LayoutByCategory = ({ teamPublications, pageSize }) => {
    const { currentData, pagination } = usePagination(teamPublications, pageSize ? pageSize : configPageSize)
    return (
      <>
        {
          currentData().map((pub) => (
            <Publication pub={pub} key={pub._id} />))
        }
        { pagination() }
      </>
    );
 };
 
 export default LayoutByCategory;
 