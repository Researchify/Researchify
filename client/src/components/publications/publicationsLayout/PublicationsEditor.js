import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AiFillFileAdd } from 'react-icons/ai';
import { sortingOptions, layoutOptions } from '../../../config/publications';
import { updatePublicationOptions } from '../../../actions/website';
import '../publications.css';

export const StyledButtonGroup = styled.div`
  background-color: transparent;
  border-radius: 0;
  padding: 5px;
  color: grey;
`;

export const ButtonGroupItem = styled.button`
  background: #ededed;
  border: 1px solid #ccc;
  padding: 1px 3px;
  border-radius: 3px;
  cursor: pointer;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande";
  width: auto;
  &:hover{
    background: lightgray;
  }
  ${({ press }) => (press
    && 'background: #ededed; outline: none; -webkit-box-shadow: inset 0px 0px 10px #c1c1c1; -moz-box-shadow: inset 0px 0px 10px #c1c1c1; box-shadow: inset 0px 0px 10px #c1c1c1;&:hover { background: #BEBEBE }'
  )
}
`;

export const EditorButton = styled.button`
  color: white;
  border: 1px solid #ccc;
  cursor: pointer;
  width: auto;
  background-color: #007bff;
  border-color: #007bff;
  padding: .25rem .5rem;
  font-size: .875rem;
  line-height: 1.5;
  border-radius: .2rem;
  &:hover{
    background-color: #0069d9;
  }
`;

const PublicationsEditor = ({
  options,
  setOptions,
  publication,
  teamId,
  sortPublications,
  setShowCreateForm,
  setShowImportForm,
}) => {
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePublicationOptions(teamId, options));
  };
  return (
    <>
      <StyledButtonGroup>
        <Dropdown>
          <Dropdown.Toggle style={{ padding: '5px' }}>
            <AiFillFileAdd />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowCreateForm(true)}>Add Publication</Dropdown.Item>
            <Dropdown.Item onClick={() => setShowImportForm(true)}>Import Publication</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledButtonGroup>
      <StyledButtonGroup>
        Group By
        {' '}
        {Object.keys(layoutOptions).map((layout, i) => (
          <ButtonGroupItem
            press={options.layout === layoutOptions[layout]}
            key={i}
            onClick={() => setOptions({ ...options, layout: layoutOptions[layout] })}
          >
            {layoutOptions[layout]}
          </ButtonGroupItem>
        ))}
      </StyledButtonGroup>
      <StyledButtonGroup>
        Sort By
        {' '}
        {Object.keys(sortingOptions).map((sortBy, i) => (
          <ButtonGroupItem
            press={options.sortBy === sortingOptions[sortBy]}
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
                press={options.sortBy === 'Category Title'}
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
      <StyledButtonGroup>
        <EditorButton
          onClick={handleUpdate}
        >
          Update Layout
        </EditorButton>
      </StyledButtonGroup>
    </>
  );
};

export default PublicationsEditor;
