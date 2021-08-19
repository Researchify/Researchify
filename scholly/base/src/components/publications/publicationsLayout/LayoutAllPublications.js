/**
 * The LayoutAllPublications component displays a list of publications
 */
 import React from 'react';
 import usePagination from '../../shared/usePagination';
 import Publication from '../publication/Publication';
 import { TEAM_PUBLICATIONS } from '../../../global/data';
 
 const LayoutAllPublications = () => {
   const { currentData, pagination } = usePagination(TEAM_PUBLICATIONS, 10)
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
 