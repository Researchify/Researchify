import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { layoutOption, sortingOption } from '../../../config/publications';

const PublicationsDropdown = ({
    options,
    setOptions,
    publications,
    sortPublications,
}) => {
    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Dropdown style={{marginRight: '3px'}}>
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

            <Dropdown style={{marginLeft: '3px'}}>
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
                        sortPublications(publications, e.target.value);
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
                            sortPublications(publications, e.target.value);
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