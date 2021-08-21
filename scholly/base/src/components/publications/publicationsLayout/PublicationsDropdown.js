import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { layoutOption, sortingOption } from '../../../config/publications';

const PublicationsDropdown = ({
    preference,
    setPreference,
    publication,
}) => {
    const sortPublications = (teamPublications, option) => {
        switch (option) {
            case sortingOption.AUTHOR:
                teamPublications.sort((a, b) =>
                    a.authors[0].toLowerCase() > b.authors[0].toLowerCase() ? 1 : -1
                );
                break;
            case sortingOption.TITLE:
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

            <Dropdown style={{marginLeft: '3px'}}>
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
    )
}

export default PublicationsDropdown