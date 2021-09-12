import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { sortingOptions, groupByOptions } from '../../../config/publications';
import { updatePublicationOptions } from '../../../actions/website';

const PublicationsDropdown = ({
  options,
  setOptions,
  publication,
  teamId,
  sortPublications,
}) => {
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePublicationOptions(teamId, options));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Dropdown>
          <Dropdown.Toggle variant="light" className="mb-2">
            Group By:
            {' '}
            {options.groupBy}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(groupByOptions).map((gropuBy, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                onClick={() => {
                  if (gropuBy !== groupByOptions.CATEGORY.toUpperCase() && options.sortBy === 'Category Title') {
                    setOptions({ ...options, groupBy: groupByOptions[gropuBy], sortBy: sortingOptions.TITLE });
                    sortPublications(publication, sortingOptions.TITLE);
                    return;
                  }
                  setOptions({ ...options, groupBy: groupByOptions[gropuBy] });
                }}
              >
                {groupByOptions[gropuBy]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="light" className="mb-2">
            Sort by:
            {' '}
            {options.sortBy}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(sortingOptions).map((sortBy, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                value={sortingOptions[sortBy]}
                onClick={(e) => {
                  setOptions({ ...options, sortBy: sortingOptions[sortBy] });
                  sortPublications(publication, e.target.value);
                }}
              >
                {sortingOptions[sortBy]}
              </Dropdown.Item>
            ))}
            {options.groupBy === groupByOptions.CATEGORY
              && (
              <Dropdown.Item
                as="button"
                value="Category Title"
                onClick={(e) => {
                  setOptions({ ...options, sortBy: e.target.value });
                  sortPublications(publication, e.target.value);
                }}
              >
                Category Title
              </Dropdown.Item>
              )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="secondary"
          onClick={handleUpdate}
        >
          Update Group by &amp; Sorting Options
        </Button>
      </div>
    </div>
  );
};

// props validation
PublicationsDropdown.propTypes = {
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired,
  publication: PropTypes.array.isRequired,
  teamId: PropTypes.string.isRequired,
  sortPublications: PropTypes.func.isRequired,
};

export default PublicationsDropdown;
