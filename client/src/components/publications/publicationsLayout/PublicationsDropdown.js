import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { sortingOption, layoutOption } from '../../../config/publications';
import { useDispatch } from 'react-redux';
import { updatePublicationOptions } from '../../../actions/website'

const PublicationsDropdown = ({
  options,
  setOptions,
  publication,
  teamId,
  sortPublications,
}) => {
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePublicationOptions(teamId, options))
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Dropdown>
          <Dropdown.Toggle variant="light" className="mb-2">
            Layout: {options.layout}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(layoutOption).map((layout, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                onClick={() => setOptions({...options, layout: layoutOption[layout]})}
              >
                {layoutOption[layout]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown >
          <Dropdown.Toggle variant="light" className="mb-2">
            Sort by: {options.sortBy}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(sortingOption).map((sortBy, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                value={sortingOption[sortBy]}
                onClick={(e) => {
                  setOptions({...options, sortBy: sortingOption[sortBy]})
                  sortPublications(publication, e.target.value);
                }}
              >
                {sortingOption[sortBy]}
              </Dropdown.Item>
            ))}
            {options.layout === layoutOption.BY_CATEGORY && 
              <Dropdown.Item
                as="button"
                value="Category Title"
                onClick={(e) => {
                  setOptions({...options, sortBy: e.target.value})
                sortPublications(publication, e.target.value);
              }}
              >
                Category Title
              </Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='mb-3' style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="secondary"
          onClick={handleUpdate}
        > 
          Update Layout & Sorting Options 
        </Button>
      </div>
    </div>
  );
};

export default PublicationsDropdown;