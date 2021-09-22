/**
 * The GroupByNone component displays a list of publications
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  Row, Col, Modal, Button,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';
import { CHECK_PUBLICATIONS, UNCHECK_PUBLICATIONS } from '../../../actions/types';
import { deleteBulkPublications } from '../../../actions/publications';
import { ButtonGroupItem } from './PublicationsEditor';

const GroupByNone = ({ teamPublications, pageSize, groupBy }) => {
  const { currentData, pagination } = usePagination(teamPublications, pageSize || configPageSize);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedCounter, setCheckedCounter] = useState(0);
  const dispatch = useDispatch();
  const { checkedPublications } = useSelector((state) => state.publications);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

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

  const handleDelete = () => {
    const publicationIdList = teamPublications.filter((pub) => checkedPublications.includes(pub._id));
    dispatch(deleteBulkPublications(publicationIdList.map((pub) => pub._id)));
    setCheckedCounter(0);
    setShowDeleteMessage(false);
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
                  <ButtonGroupItem borderColor="#9c503d" color="#9c503d" hoverBorderColor="#9c503d" hoverColor="white" onClick={() => setShowDeleteMessage(true)}>
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

      {/* A modal for showing confirm delete message */}
      <Modal show={showDeleteMessage}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Delete Publications </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          {' '}
          {checkedCounter}
          {' '}
          publication(s)?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowDeleteMessage(false)}>
            {' '}
            Cancel
            {' '}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {' '}
            Confirm
            {' '}
          </Button>
        </Modal.Footer>
      </Modal>
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
