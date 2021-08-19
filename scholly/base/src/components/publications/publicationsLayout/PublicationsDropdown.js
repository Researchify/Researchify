import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const PublicationsDropdown = ({
    allLayouts,
    layout,
    setLayout,
    teamPublications,
    setTeamPublications}) => {

    const [sortingOption, setSortingOption] = useState('Year');

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
        setTeamPublications(teamPublications)
    };

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
                        sortPublications(teamPublications, e.target.value);
                        setSortingOption(e.target.value);
                    }}
                >
                    Year
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
                    value="Author"
                    onClick={(e) => {
                        sortPublications(teamPublications, e.target.value);
                        setSortingOption(e.target.value);
                    }}
                >
                    Author
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
                    value="Title"
                    onClick={(e) => {
                        sortPublications(teamPublications, e.target.value);
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