/**
 * The Publications component displays a list of publications.
 */
import React, { Fragment } from 'react';
import { Accordion } from 'react-bootstrap';
import Publication from './publication/Publication';
import { TEAM_PUBLICATIONS } from '../../../../global/data';

const Publications = () => {
  const teamPublications = TEAM_PUBLICATIONS;

  return (
    <Fragment>
      <Accordion>
        {teamPublications.map((pub) => (
          <Publication pub={pub} key={pub._id} />
        ))}
      </Accordion>
    </Fragment>
  );
};

export default Publications;
