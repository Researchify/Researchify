/**
 * The LayoutAllPublications component displays a list of publications
 */
 import React from 'react';
 import usePagination from '../../shared/usePagination';
 import Publication from '../publication/Publication';
 import { pageSize as configPageSize } from '../../../config/publications';
 import { TEAM_PUBLICATIONS } from '../../../global/data';
 
 const LayoutAllPublications = () => {
   const { currentData, pagination } = usePagination(TEAM_PUBLICATIONS, configPageSize)
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
 
 export default LayoutAllPublications;
 