/**
 * The Publications component displays a list of publications.
 */
import React, { Fragment, useState } from 'react';
import { Accordion, Dropdown, DropdownButton } from 'react-bootstrap';
import LayoutAllPublications from './publicationsLayout/LayoutAllPublications';
import LayoutByCategory from './publicationsLayout/LayoutByCategory'
import { TEAM_PUBLICATIONS } from '../../global/data';

const Publications = () => {
  const allLayouts = {
    allPublications: 'All Publications',
    byCategory: 'By Category',
  };

  const [sortingOption, setSortingOption] = useState('Year');

  const renderPublications = () => {
    switch (layout) {
      case allLayouts.byCategory:
        return <LayoutByCategory teamPublications={TEAM_PUBLICATIONS}/>;
      default:
        return <LayoutAllPublications teamPublications={TEAM_PUBLICATIONS}/>;
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

      <DropdownButton
        className="ml-4"
        variant="light"
        id="dropdown-item-button"
        title={'Sort by: ' + sortingOption}
      >
        <Dropdown.Item
          as="button"
          value="Year"
          onClick={(e) => {
            setSortingOption(e.target.value);
          }}
        >
          Year
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          value="Author"
          onClick={(e) => {
            setSortingOption(e.target.value);
          }}
        >
          Author
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          value="Title"
          onClick={(e) => {
            setSortingOption(e.target.value);
          }}
        >
          Title
        </Dropdown.Item>
        {/* {toggleSortingOptions(setSortingOption)} */}
      </DropdownButton>

      <Accordion>
        {renderPublications()}
      </Accordion>
    </Fragment>
  );
};

export default Publications;
