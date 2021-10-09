/**
 * The PublicationPage component displays a list of publications and a twitter panel.
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { TEAM_INFO } from '../../../../global/data';
import Publications from './Publications';

const PublicationPage = () => {
  const { teamName } = TEAM_INFO;
  return (
    <>
      <Helmet>
        <title>
          {' '}
          Publications -
          {' '}
          {teamName}
          {' '}
        </title>
      </Helmet>
      <Publications />
    </>
  );
};
export default PublicationPage;
