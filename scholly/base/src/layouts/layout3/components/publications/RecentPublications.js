/**
 * The RecentPublications component displays a list of the 5 most recent publications.
 */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import Publication from './publication/Publication';
import { TEAM_PUBLICATIONS } from '../../../../global/data';

const RecentPublications = () => {
  let teamPublications = TEAM_PUBLICATIONS;
  teamPublications.sort((a, b) => ((a.yearPublished < b.yearPublished) ? 1 : -1));
  teamPublications = teamPublications.slice(0, 5);
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

export default RecentPublications;
