/**
 * The GroupByNone component displays a list of publications
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Row, Col } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';
import { CHECK_PUBLICATIONS, UNCHECK_PUBLICATIONS } from '../../../actions/types';
import { deleteBulkPublications } from '../../../actions/publications';
import { ButtonGroupItem } from './PublicationsEditor';

const GroupByNone = ({ teamPublications, pageSize, groupBy }) => {
  const { currentData, pagination } = usePagination(teamPublications, pageSize || configPageSize);
  const [checked, setChecked] = useState(false);
  const [checkedCounter, setCheckedCounter] = useState(0);
  const dispatch = useDispatch();
  const { checkedPublications } = useSelector((state) => state.publications);
  const { teamId } = useSelector((state) => state.team);

  useEffect(() => {
    let count = 0;
    teamPublications.forEach((pub) => {
      if (checkedPublications.includes(pub._id)) count += 1;
    });
    setCheckedCounter(count);
  }, [checked, checkedPublications]);

  const handleChange = () => {
    if (checked) {
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
    setChecked(!checked);
  };

  const handleDelete = () => {
    const publicationIdList = teamPublications.filter((pub) => checkedPublications.includes(pub._id));
    dispatch(deleteBulkPublications(teamId, publicationIdList.map((pub) => pub._id)));
    setCheckedCounter(0);
  };

  return (
    <>
      <div className="publicationList">
        <Row>
          <Col>
            <div style={{ padding: '10px', fontSize: '15px' }}>
              <input type="checkbox" checked={checkedCounter === teamPublications.length} onChange={handleChange} />
              {' '}
              { checkedCounter > 0 ? (
                <>
                  <ButtonGroupItem borderColor="red" color="red" hoverBorderColor="red" hoverColor="white" onClick={handleDelete}>
                    <RiDeleteBin6Line />
                    {' '}
                    {checkedCounter}
                    {' '}
                    Publications
                    {' '}
                  </ButtonGroupItem>
                </>
              )
                : 'Select All'}
            </div>
          </Col>
          <Col>
            <h5 className="text-center">
              {groupBy || ' '}
            </h5>
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
