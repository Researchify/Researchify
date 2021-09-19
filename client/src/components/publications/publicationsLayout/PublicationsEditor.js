import React from 'react';
import { Dropdown, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { sortingOptions, groupByOptions } from '../../../config/publications';
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
  padding: 1px 8px;
  border-radius: 3px;
  cursor: pointer;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande";
  width: auto;
  transition: all 0.2s ease 0s;
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
    <Row>
      <Col md={1} sm={2}>
        <StyledButtonGroup>
          <Dropdown>
            <Dropdown.Toggle size="sm">
              Add
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowCreateForm(true)}>Add Manually</Dropdown.Item>
              <Dropdown.Item onClick={() => setShowImportForm(true)}>Import Publications</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </StyledButtonGroup>
      </Col>

      <Col md={4} sm={4}>
        <StyledButtonGroup>
          Group By
          {' '}
          {Object.keys(groupByOptions).map((groupBy) => (
            <ButtonGroupItem
              color="grey"
              press={options.groupBy === groupByOptions[groupBy]}
              key={groupBy}
              onClick={() => setOptions({ ...options, groupBy: groupByOptions[groupBy] })}
            >
              {groupByOptions[groupBy]}
            </ButtonGroupItem>
          ))}
        </StyledButtonGroup>
      </Col>

      <Col md={5} sm={4}>
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
          {options.groupBy === groupByOptions.CATEGORY
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
      </Col>

      <Col md={2} sm={2}>
        <StyledButtonGroup>
          <EditorButton
            onClick={handleUpdate}
          >
            Update Layout
          </EditorButton>
        </StyledButtonGroup>
      </Col>
    </Row>
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
