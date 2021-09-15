import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { sortingOptions, layoutOptions } from '../../../config/publications';
import { updatePublicationOptions } from '../../../actions/website';
import '../publications.css';

export const StyledButtonGroup = styled.div`
  background-color: transparent;
  border-radius: 0;
  padding: 5px;
  color: black;
`;

export const ButtonGroupItem = styled.button`
  background: #ededed;
  border: 1px solid ${(props) => props.borderColor || '#ccc'};
  padding: 1px 3px;
  border-radius: 3px;
  cursor: pointer;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande";
  width: auto;
  color: ${(props) => props.color};
  &:hover{
    background: ${(props) => props.hoverBorderColor || 'lightgrey'};
    color: ${(props) => props.hoverColor};
  }
  ${({ press }) => (press
    && 'color: #4d4d4d; background: #ededed; outline: none; -webkit-box-shadow: inset 0px 0px 10px #c1c1c1; -moz-box-shadow: inset 0px 0px 10px #c1c1c1; box-shadow: inset 0px 0px 10px #c1c1c1;&:hover { background: #BEBEBE }'
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
  publications,
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
          <Dropdown.Toggle size="sm">
            Add
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowCreateForm(true)}>Insert Publication</Dropdown.Item>
            <Dropdown.Item onClick={() => setShowImportForm(true)}>Import Publications</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledButtonGroup>
      <StyledButtonGroup>
        Group By
        {' '}
        {Object.keys(layoutOptions).map((layout) => (
          <ButtonGroupItem
            color="grey"
            press={options.layout === layoutOptions[layout]}
            key={layout}
            onClick={() => setOptions({ ...options, layout: layoutOptions[layout] })}
          >
            {layoutOptions[layout]}
          </ButtonGroupItem>
        ))}
      </StyledButtonGroup>
      <StyledButtonGroup>
        Sort By
        {' '}
        {Object.keys(sortingOptions).map((sortBy) => (
          <ButtonGroupItem
            color="grey"
            press={options.sortBy === sortingOptions[sortBy]}
            key={sortBy}
            value={sortingOptions[sortBy]}
            onClick={(e) => {
              setOptions({ ...options, sortBy: sortingOptions[sortBy] });
              sortPublications(publications, e.target.value);
            }}
          >
            {sortingOptions[sortBy]}
          </ButtonGroupItem>
        ))}
        {options.layout === layoutOptions.BY_CATEGORY
              && (
              <ButtonGroupItem
                color="grey"
                press={options.sortBy === 'Category Title'}
                value="Category Title"
                onClick={(e) => {
                  setOptions({ ...options, sortBy: e.target.value });
                  sortPublications(publications, e.target.value);
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
// props validation
PublicationsEditor.propTypes = {
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired,
  publications: PropTypes.array.isRequired,
  teamId: PropTypes.string.isRequired,
  sortPublications: PropTypes.func.isRequired,
  setShowCreateForm: PropTypes.func.isRequired,
  setShowImportForm: PropTypes.func.isRequired,
};
export default PublicationsEditor;
