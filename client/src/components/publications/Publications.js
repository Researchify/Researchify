/**
 * The Publications component displays a list of publications
 */

import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { getPublicationsByTeamId } from '../../actions/publications';
import './publications.css';
import GroupByNone from './publicationsLayout/GroupByNone';
import GroupByCategory from './publicationsLayout/GroupByCategory';

import { groupByOptions } from '../../config/publications';
import { REVERT_HEADER_COLOR } from '../../actions/types';

const Publications = ({
  options,
  sortPublications,
  publications,
  teamId,
  setPublications,

}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.publications);

  useEffect(() => {
    if (teamId) {
      dispatch(getPublicationsByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  const renderPublications = useCallback(() => {
    switch (options.groupBy) {
      case groupByOptions.CATEGORY:
        return <GroupByCategory teamPublications={publications} />;
      default:
        return <GroupByNone teamPublications={publications} />;
    }
  }, [options, publications]);

  useEffect(() => {
    const sortedPublication = sortPublications(publications, options.sortBy);
    setPublications(sortedPublication);
    const newlyAddedPublications = publications.filter((pub) => pub.isNewlyAdded);
    if (newlyAddedPublications.length > 0) {
      setTimeout(() => {
        dispatch({
          type: REVERT_HEADER_COLOR,
          payload: newlyAddedPublications,
        });
      }, 2500);
    }
  }, [publications]);

  return (
    <>
      {publications.length === 0 && !loading ? (
        <div style={{ marginTop: '30px' }} className="publicationList">
          <Alert variant="primary">
            There is no publication for this team. Please add or import
            publications.
          </Alert>
        </div>
      ) : (
        renderPublications()
      )}

    </>
  );
};
// props validation
Publications.propTypes = {
  options: PropTypes.object.isRequired,
  setPublications: PropTypes.func.isRequired,
  publications: PropTypes.array.isRequired,
  teamId: PropTypes.string.isRequired,
  sortPublications: PropTypes.func.isRequired,
};
export default Publications;
