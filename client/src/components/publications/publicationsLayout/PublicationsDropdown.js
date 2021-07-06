import React, { useEffect, useState } from 'react';
import { sortPublications } from '../../../actions/publications';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const PublicationsDropdown = ({
  allLayouts,
  layout,
  setLayout,
  teamPublications,
  toggleSortingOptions,
}) => {
  const [sortingOption, setSortingOption] = useState('Year');
  const dispatch = useDispatch();

  return (
    <div className="mb-3 mt-3 text-center">
      <Dropdown className="ml-5">
        <Dropdown.Toggle variant="light" className="mb-2">
          Layout: {layout}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(allLayouts).map((layout) => (
            <Dropdown.Item
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
            dispatch(sortPublications(teamPublications, e.target.value));
            setSortingOption(e.target.value);
          }}
        >
          Year
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          value="Author"
          onClick={(e) => {
            dispatch(sortPublications(teamPublications, e.target.value));
            setSortingOption(e.target.value);
          }}
        >
          Author
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          value="Title"
          onClick={(e) => {
            dispatch(sortPublications(teamPublications, e.target.value));
            setSortingOption(e.target.value);
          }}
        >
          Title
        </Dropdown.Item>
        {toggleSortingOptions(setSortingOption)}
      </DropdownButton>
    </div>
  );
};

export default PublicationsDropdown;
