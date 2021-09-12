/**
 * The Publications component displays a list of publications.
 */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import Publication from './publication/Publication';
import { TEAM_PUBLICATIONS } from '../../../../global/data';
import usePagination from '../shared/usePagination';
import { pageSize } from '../../../../shared/config/publications';

const Publications = () => {
  const { currentData, pagination } = usePagination(TEAM_PUBLICATIONS, pageSize);

  return (
    <>
      <Accordion>
        {currentData().map((pub) => (
          <Publication pub={pub} key={pub._id} />
        ))}
      </Accordion>
      {pagination()}
    </>
  );
};

export default Publications;