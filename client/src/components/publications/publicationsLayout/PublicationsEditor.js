import React, { useState, useEffect } from 'react';
import {
  Dropdown, OverlayTrigger, Tooltip, Modal, Button, Row, Col,
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
import { deleteBatchPublications } from '../../../actions/publications';

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
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [checkedCounter, setCheckedCounter] = useState(0);

  const handleUpdate = () => {
    dispatch(updatePublicationOptions(teamId, options));
  };

  const handleDelete = () => {
    dispatch(deleteBatchPublications(checkedPublications));
    setCheckedCounter(0);
    setShowDeleteMessage(false);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Plsease select a publication to delete
    </Tooltip>
  );

  useEffect(() => {
    setCheckedCounter(checkedPublications.length);
  }, [checkedPublications]);

  return (
    <div>
      <Row>
        <Col md={4}>
          <div style={{ display: 'flex' }}>

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
                  onClick={() => setShowDeleteMessage(true)}
                  disabled={checkedPublications.length === 0}
                >
                  <RiDeleteBin6Line />
                  {' '}
                  {checkedCounter > 0 && checkedCounter}
                  {' '}
                  Publications
                  {' '}
                </DangerButton>
              </div>
            </ConditionalWrapper>
          </div>
        </Col>

        <Col md={6}>
          <div style={{ display: 'flex' }}>
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
          </div>

        </Col>

        <Col md={2}>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={ButtonHint}>
            <PrimaryButton
              className="float-right"
              onClick={handleUpdate}
            >
              Update Layout
            </PrimaryButton>
          </OverlayTrigger>
        </Col>
      </Row>

      {/* A modal for showing confirm delete message */}
      <Modal show={showDeleteMessage}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Delete Publications </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          {' '}
          {checkedPublications.length}
          {' '}
          publication(s)?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowDeleteMessage(false)}>
            {' '}
            Cancel
            {' '}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {' '}
            Confirm
            {' '}
          </Button>
        </Modal.Footer>
      </Modal>
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
