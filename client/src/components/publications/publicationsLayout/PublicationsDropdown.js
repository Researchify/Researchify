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
}) => {
  const dispatch = useDispatch();
  const sortPublications = (publication, option) => {
    switch (option) {
      case sortingOption.AUTHOR:
        publication.sort((a, b) =>
          a.authors[0].toLowerCase() > b.authors[0].toLowerCase() ? 1 : -1
        );
        break;
      case sortingOption.TITLE:
        // publication title
        publication.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
        break;
      case sortingOption.Category_Title:
        // journal or conference title
        publication.sort((a, b) =>
          a.category.categoryTitle.toLowerCase() >
          b.category.categoryTitle.toLowerCase()
            ? 1
            : -1
        );
        break;
      default:
        // sort by title then year for consistency with the db
        publication.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
        publication.sort((a, b) => (a.year > b.year ? -1 : 1));
        break;
    }
  };

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