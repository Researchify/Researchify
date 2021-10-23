/**
 * The GroupByNone component displays a list of publications
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';
import { CHECK_PUBLICATIONS, UNCHECK_PUBLICATIONS } from '../../../actions/types';

const GroupByNone = ({ teamPublications, pageSize, groupBy }) => {
  const { currentData, pagination } = usePagination(teamPublications, pageSize || configPageSize);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedCounter, setCheckedCounter] = useState(0);
  const dispatch = useDispatch();
  const { checkedPublications } = useSelector((state) => state.publications);

  useEffect(() => {
    let count = 0;
    teamPublications.forEach((pub) => {
      if (checkedPublications.includes(pub._id)) count += 1;
    });
    setCheckedCounter(count);
  }, [checkAll, checkedPublications, teamPublications]);

  const handleChange = () => {
    if (checkAll) {
      dispatch({
        type: UNCHECK_PUBLICATIONS,
        payload: teamPublications.map((pub) => pub._id),
      });
    } else {
      dispatch({
        type: CHECK_PUBLICATIONS,
        payload: teamPublications.map((pub) => pub._id),
      });
    }
    setCheckAll(!checkAll);
  };

  return (
    <>
      <div className="publicationList">
        <Row>
          <Col>
            <div style={{ padding: '10px', fontSize: '17px' }}>
              <input type="checkbox" checked={checkedCounter === teamPublications.length} onChange={handleChange} />
              {' '}
              Select All
            </div>
          </Col>
          <Col>
            <h4 className="text-center">
              {groupBy || ' '}
            </h4>
          </Col>
          <Col>
            <div className="float-right">
              { pagination() }
            </div>
          </Col>
        </Row>
        {
        currentData().map((pub) => (
          <Publication pub={pub} key={pub._id} />))
      }
      </div>
    </>
  );
};

// props validation
GroupByNone.propTypes = {
  teamPublications: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  groupBy: PropTypes.string,
};
GroupByNone.defaultProps = {
  pageSize: 10,
  groupBy: null,
};

export default GroupByNone;
