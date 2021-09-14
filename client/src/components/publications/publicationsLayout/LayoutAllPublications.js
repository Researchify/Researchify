/**
 * The LayoutAllPublications component displays a list of publications
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Row, Col } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';
import { CHECK_PUBLICATIONS, UNCHECK_PUBLICATIONS } from '../../../actions/types';
import { ButtonGroupItem } from './PublicationsEditor';

const LayoutAllPublications = ({ teamPublications, pageSize, groupBy }) => {
  // Since we need to validate pageSize and set default, configPageSize might not necessary
  const { currentData, pagination } = usePagination(teamPublications, pageSize || configPageSize);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const { checkedPublications } = useSelector((state) => state.publications);

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

  const checkedPublicationsCount = () => {
    let count = 0;
    teamPublications.forEach((pub) => {
      if (checkedPublications.includes(pub._id)) count += 1;
    });
    return count;
  };

  return (
    <>
      <div className="publicationList">
        <Row>
          <Col>
            <div style={{ padding: '10px', fontSize: '15px' }}>
              <input type="checkbox" checked={checked} onChange={handleChange} />
              {' '}
              { checkedPublicationsCount() > 0 ? (
                <>
                  <ButtonGroupItem borderColor="red" color="red" hoverBorderColor="red" hoverColor="white">
                    <RiDeleteBin6Line />
                    {' '}
                    {checkedPublicationsCount()}
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
  groupBy: PropTypes.string,
};
LayoutAllPublications.defaultProps = {
  pageSize: 10,
  groupBy: null,
};

export default LayoutAllPublications;
