import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const PublicationsDropdown = ({
    allLayouts,
    layout,
    setLayout}) => {
    const [sortingOption, setSortingOption] = useState('Year');

    return(
        <div className="mb-3 mt-3 text-center">
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

        </div>
    )
}

export default PublicationsDropdown