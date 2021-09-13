/**
 * The LayoutAllPublications component displays a list of publications
 */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Row, Col } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';
import { ButtonGroupItem } from './PublicationsEditor';

const LayoutAllPublications = ({ teamPublications, pageSize }) => {
  // Since we need to validate pageSize and set default, configPageSize might not necessary
  const { currentData, pagination } = usePagination(teamPublications, pageSize || configPageSize);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleChange = () => {
    if (checked) {
      dispatch({
        type: 'UNCHECK_PUBLICATION',
        payload: teamPublications.map((pub) => pub._id),
      });
    } else {
      dispatch({
        type: 'CHECK_PUBLICATIONS',
        payload: teamPublications.map((pub) => pub._id),
      });
    }
    setChecked(!checked);
  };

  return (
    <>
      <div className="publicationList">
        <Row>
          <Col>
            <div style={{ padding: '10px', fontSize: '15px' }}>
              <input type="checkbox" checked={checked} onChange={handleChange} />
              {' '}
              {checked ? (
                <>
                  <ButtonGroupItem borderColor="red" color="red">
                    <RiDeleteBin6Line />
                    {' '}
                    {teamPublications.length}
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
LayoutAllPublications.propTypes = {
  teamPublications: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
};
LayoutAllPublications.defaultProps = {
  pageSize: 10,
};

export default LayoutAllPublications;
