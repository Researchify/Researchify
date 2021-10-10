import React from 'react';
import {
  Dropdown, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { sortingOptions, groupByOptions } from '../../../config/publications';
import { updatePublicationOptions } from '../../../actions/website';
import '../publications.css';
import {
  PrimaryButton, StyledButtonGroup, ButtonGroupItem, DangerButton,
} from '../../shared/styledComponents';
import ConditionalWrapper from '../../shared/ConditionalWrapper';

export const StyledDropdownToggle = styled(Dropdown.Toggle)` //Purple
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

const ButtonHint = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Update your publications sorting and group by options in the deployed website
  </Tooltip>
);

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
  const { checkedPublications } = useSelector((state) => state.publications);
  const handleUpdate = () => {
    dispatch(updatePublicationOptions(teamId, options));
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Plsease select a publication to delete
    </Tooltip>
  );

  return (
    <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Dropdown>
          <StyledDropdownToggle style={{ whiteSpace: 'normal' }}>
            Add Publication(s)
          </StyledDropdownToggle>
          <Dropdown.Menu>
            <StyledDropdowItem onClick={() => setShowCreateForm(true)}>Add Manually</StyledDropdowItem>
            <StyledDropdowItem onClick={() => setShowImportForm(true)}>Import Publications</StyledDropdowItem>
          </Dropdown.Menu>
        </Dropdown>
        {' '}
        <ConditionalWrapper
          condition={checkedPublications.length === 0}
          wrapper={(children) => (
            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip}
            >
              {children}
            </OverlayTrigger>
          )}
        >
          <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
            <DangerButton
              style={{ marginLeft: '5px' }}
              onClick={() => console.log('setShowDeleteAll(true)')}
              disabled={checkedPublications.length === 0}
            >
              <RiDeleteBin6Line />
              {' '}
              {checkedPublications.length > 0 && checkedPublications.length}
              {' '}
              Team Members
              {' '}
            </DangerButton>
          </div>
        </ConditionalWrapper>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={ButtonHint}>
          <PrimaryButton
            className="float-right"
            onClick={handleUpdate}
          >
            Update Layout
          </PrimaryButton>
        </OverlayTrigger>
      </div>
    </div>
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
