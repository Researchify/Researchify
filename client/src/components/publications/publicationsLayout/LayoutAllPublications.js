/**
 * The LayoutAllPublications component displays a list of publications
 */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import usePagination from '../../shared/usePagination';
import Publication from '../publication/Publication';
import { pageSize as configPageSize } from '../../../config/publications';

const LayoutAllPublications = ({ teamPublications, pageSize, groupBy = null }) => {
  const { currentData, pagination } = usePagination(teamPublications, pageSize || configPageSize);
  //const { checkedPublications } = useSelector((state) => state.publications);
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ padding: '10px', fontSize: '15px' }}>
            <input type="checkbox" checked={checked} onChange={handleChange} />
            {' '}
            Select All
          </div>
          <h5>
            {groupBy || ' '}
          </h5>
          { pagination() }
        </div>
        {
        currentData().map((pub) => (
          <Publication pub={pub} key={pub._id} />))
      }
      </div>
    </>
  );
};

export default LayoutAllPublications;
