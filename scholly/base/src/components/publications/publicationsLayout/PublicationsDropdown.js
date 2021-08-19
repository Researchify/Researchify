import React from 'react';
import { Dropdown } from 'react-bootstrap';

const PublicationsDropdown = ({
    allLayouts,
    layout,
    setLayout,
    allSorting,
    sortBy,
    setsortBy,
    publication
}) => {
    const sortPublications = (teamPublications, sortingOption) => {
        switch (sortingOption) {
            case 'Author':
                teamPublications.sort((a, b) =>
                    a.authors[0].toLowerCase() > b.authors[0].toLowerCase() ? 1 : -1
                );
                break;
            case 'Title':
                // publication title
                teamPublications.sort((a, b) =>
                    a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
                );
                break;
            case 'Category Title':
                // journal or conference title
                teamPublications.sort((a, b) =>
                    a.category.categoryTitle.toLowerCase() >
                    b.category.categoryTitle.toLowerCase()
                    ? 1
                    : -1
                );
                break;
            default:
                // sort by title then year for consistency with the db
                teamPublications.sort((a, b) =>
                    a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
                );
                teamPublications.sort((a, b) => (a.year > b.year ? -1 : 1));
                break;
            }
        };

    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Dropdown style={{marginRight: '3px'}}>
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

            <Dropdown style={{marginLeft: '3px'}}>
                <Dropdown.Toggle variant="light" className="mb-2">
                Sort by: {sortBy}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {Object.keys(allSorting).map((sortBy, i) => (
                    <Dropdown.Item
                    key={i}
                    as="button"
                    value={allSorting[sortBy]}
                    onClick={(e) => {
                        setsortBy(allSorting[sortBy])
                        sortPublications(publication, e.target.value);
                    }}
                    >
                    {allSorting[sortBy]}
                    </Dropdown.Item>
                ))}
                {layout === allLayouts.byCategory && 
                    <Dropdown.Item
                        as="button"
                        value="Category Title"
                        onClick={(e) => {
                            setsortBy(e.target.value)
                            sortPublications(publication, e.target.value);
                        }}
                    >
                        Category Title
                    </Dropdown.Item>
                }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default PublicationsDropdown