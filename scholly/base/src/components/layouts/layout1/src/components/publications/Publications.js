/**
 * The Publications component displays a list of publications.
 */
import React, { Fragment } from 'react';
import { Accordion } from 'react-bootstrap';
import Publication from './publication/Publication';
import { TEAM_PUBLICATIONS } from '../../../../../../global/data';
import usePagination from '../shared/usePagination';
import { pageSize } from '../../../../../../config/publications';

const Publications = () => {
  const { currentData, pagination } = usePagination(TEAM_PUBLICATIONS, pageSize)

  return (
    <Fragment>
      <Accordion>
        {currentData().map((pub) => (
          <Publication pub={pub} key={pub._id} />
        ))}
      </Accordion>
      {pagination()}
    </Fragment>
  );
};

export default Publications;
