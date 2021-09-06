import React from 'react';
import { Button, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { sortingOptions, layoutOptions } from '../../../config/publications';
import { updatePublicationOptions } from '../../../actions/website';

const StyledButtonGroup = styled.div`
  background-color: transparent;
  border-radius: 0;
`;

const ButtonGroupItem = styled.button`
  background: #ededed;
  border: 1px solid #ccc;
  padding: 1px 3px;
  border-radius: 3px;
  cursor: pointer;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande";
`;

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
    <Row>
      <StyledButtonGroup>
        Group by:
        {Object.keys(layoutOptions).map((layout, i) => (
          <ButtonGroupItem
            className={options.layout === layoutOptions[layout] && 'pressed-button'}
            key={i}
            onClick={() => setOptions({ ...options, layout: layoutOptions[layout] })}
          >
            {layoutOptions[layout]}
          </ButtonGroupItem>
        ))}
      </StyledButtonGroup>
      <StyledButtonGroup>
        Sort by:
        {Object.keys(sortingOptions).map((sortBy, i) => (
          <ButtonGroupItem
            className={options.sortBy === sortingOptions[sortBy] && 'pressed-button'}
            key={i}
            value={sortingOptions[sortBy]}
            onClick={(e) => {
              setOptions({ ...options, sortBy: sortingOptions[sortBy] });
              sortPublications(publication, e.target.value);
            }}
          >
            {sortingOptions[sortBy]}
          </ButtonGroupItem>
        ))}
        {options.layout === layoutOptions.BY_CATEGORY
              && (
              <ButtonGroupItem
                className={options.sortBy === 'Category Title' && 'pressed-button'}
                value="Category Title"
                onClick={(e) => {
                  setOptions({ ...options, sortBy: e.target.value });
                  sortPublications(publication, e.target.value);
                }}
              >
                Category Title
              </ButtonGroupItem>
              )}
      </StyledButtonGroup>

      <Button
        variant="secondary"
        onClick={handleUpdate}
      >
        Update Layout
      </Button>

    </Row>
  );
};

export default PublicationsDropdown;
