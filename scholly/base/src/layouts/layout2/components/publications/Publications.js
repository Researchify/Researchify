/**
 * The Publications component displays a list of publications.
 */
import React from 'react';
import Publication from './publication/Publication';
import { TEAM_PUBLICATIONS } from '../../../../global/data';

const Publications = () => {
  const teamPublications = TEAM_PUBLICATIONS;

  return (
    <>
      {teamPublications.map((pub) => (
        <Publication pub={pub} key={pub._id} />
      ))}
    </>
  );
};

export default Publications;
