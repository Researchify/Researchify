/**
 * The Publications component displays a list of publications.
 */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import Publication from './publication/Publication';
import { TEAM_PUBLICATIONS } from '../../../../global/data';

const Publications = () => {
  const teamPublications = TEAM_PUBLICATIONS;

  return (
    <>
      <Accordion>
        {teamPublications.map((pub) => (
          <Publication pub={pub} key={pub._id} />
        ))}
      </Accordion>
    </>
  );
};

export default Publications;
