import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { sortingOption, layoutOption } from '../../../config/publications';
import { useDispatch } from 'react-redux';
import { updatePublicationOptions } from '../../../actions/website'

const PublicationsDropdown = ({
  layout,
  setLayout,
  sortBy,
  setsortBy,
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
    const options = {layout, sortBy}
    dispatch(updatePublicationOptions(teamId, options))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Dropdown>
          <Dropdown.Toggle variant="light" className="mb-2">
            Layout: {layout}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(layoutOption).map((layout, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                onClick={() => setLayout(layoutOption[layout])}
              >
                {layoutOption[layout]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown >
          <Dropdown.Toggle variant="light" className="mb-2">
            Sort by: {sortBy}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(sortingOption).map((sortBy, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                value={sortingOption[sortBy]}
                onClick={(e) => {
                  setsortBy(sortingOption[sortBy])
                  sortPublications(publication, e.target.value);
                  console.log(e.target.value)
                }}
              >
                {sortingOption[sortBy]}
              </Dropdown.Item>
            ))}
            {layout === layoutOption.BY_CATEGORY && 
              <Dropdown.Item
                as="button"
                value="Category Title"
                onClick={(e) => {
                setsortBy(e.target.value)
                sortPublications(publication, e.target.value);
                console.log(e.target.value)
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