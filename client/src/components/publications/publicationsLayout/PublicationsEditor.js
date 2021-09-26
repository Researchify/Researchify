import React from 'react';
import { Dropdown, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { sortingOptions, groupByOptions } from '../../../config/publications';
import { updatePublicationOptions } from '../../../actions/website';
import '../publications.css';
import { PrimaryButton } from '../../shared/styledComponents';

export const StyledButtonGroup = styled.div`
  background-color: transparent;
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
    border: ${(props) => props.hoverBorderColor || 'lightgrey'};
  }
  ${({ press }) => (press
    && 'color: #4d4d4d; background: #ededed; outline: none; -webkit-box-shadow: inset 0px 0px 10px #c1c1c1; -moz-box-shadow: inset 0px 0px 10px #c1c1c1; box-shadow: inset 0px 0px 10px #c1c1c1;&:hover { background: #BEBEBE }'
  )
}
`;

export const StyledDropdownToggle = styled(Dropdown.Toggle)` //Purple
    padding: .375rem .75rem;
    border: 1px solid #56658a;
    border-radius: .25rem;
    background-color: #56658a;
    color: white;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:not(:disabled){
    background-color:#56658a !important;
  }
  &:not(:disabled):hover{
    background-color:rgb(60, 70, 96) !important;
  }
`;

export const StyledDropdowItem = styled(Dropdown.Item)`
  &:not(:disabled):hover{
    background-color:#F6F6F6 !important;
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
      <Col md={4} sm={4} style={{ marginBottom: '10px' }}>
        <Dropdown>
          <StyledDropdownToggle>
            Add
          </StyledDropdownToggle>
          <Dropdown.Menu>
            <StyledDropdowItem onClick={() => setShowCreateForm(true)}>Add Manually</StyledDropdowItem>
            <StyledDropdowItem onClick={() => setShowImportForm(true)}>Import Publications</StyledDropdowItem>
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col md={6} sm={6}>
        <Row>
          <StyledButtonGroup style={{ marginLeft: '12px' }}>
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
          <StyledButtonGroup style={{ marginLeft: '12px' }}>
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
        </Row>
      </Col>

      <Col md={2} sm={2}>
        <PrimaryButton
          className="float-right"
          onClick={handleUpdate}
        >
          Update Layout
        </PrimaryButton>
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
