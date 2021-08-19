/**
 * The Publications component displays a list of publications.
 */
import React, { Fragment, useState } from 'react';
import { Accordion, Dropdown } from 'react-bootstrap';
import usePagination from '../shared/usePagination';
import { TEAM_PUBLICATIONS } from '../../global/data';
import LayoutAllPublications from './publicationsLayout/LayoutAllPublications';
import LayoutByCategory from './publicationsLayout/LayoutByCategory'

const Publications = () => {
  const allLayouts = {
    allPublications: 'All Publications',
    byCategory: 'By Category',
  };

  const renderPublications = () => {
    switch (layout) {
      case allLayouts.byCategory:
        return <LayoutByCategory/>;
      default:
        return <LayoutAllPublications/>;
    }
  };

  const [layout, setLayout] = useState(allLayouts.allPublications);
  return (
    <Fragment>
      <Dropdown className="ml-5">
        <Dropdown.Toggle variant="light" className="mb-2">
          Layout: {layout}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(allLayouts).map((layout, i) => (
            <Dropdown.Item
              key={i}
              as="button"
              onClick={() => setLayout(allLayouts[layout])}
            >
              {allLayouts[layout]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Accordion>
        {/* {currentData().map((pub) => (
          <Publication pub={pub} key={pub._id} />
        ))}
      {pagination()} */}
      {renderPublications()}
      
      </Accordion>
    </Fragment>
  );
};

export default Publications;
