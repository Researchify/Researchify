import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { sortingOption, layoutOption } from '../../../config/publications';
import { useDispatch } from 'react-redux';
import { updatePublicationOptions } from '../../../actions/website'

const PublicationsDropdown = ({
  preference,
  setPreference,
  publication,
  teamId,
  sortPublications,
}) => {
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePublicationOptions(teamId, preference))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Dropdown>
          <Dropdown.Toggle variant="light" className="mb-2">
            Layout: {preference.layout}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(layoutOption).map((layout, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                onClick={() => setPreference({...preference, layout: layoutOption[layout]})}
              >
                {layoutOption[layout]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown >
          <Dropdown.Toggle variant="light" className="mb-2">
            Sort by: {preference.sortBy}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(sortingOption).map((sortBy, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                value={sortingOption[sortBy]}
                onClick={(e) => {
                  setPreference({...preference, sortBy: sortingOption[sortBy]})
                  sortPublications(publication, e.target.value);
                }}
              >
                {sortingOption[sortBy]}
              </Dropdown.Item>
            ))}
            {preference.layout === layoutOption.BY_CATEGORY && 
              <Dropdown.Item
                as="button"
                value="Category Title"
                onClick={(e) => {
                setPreference({...preference, sortBy: e.target.value})
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
          Update Layout & Sorting Preference 
        </Button>
      </div>
    </div>
  );
};

export default PublicationsDropdown;