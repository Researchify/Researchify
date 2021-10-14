/**
 * The TeamPage component displays the team member page
 */

import {
  CardDeck, Modal, Spinner, Alert, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import DeployBtn from '../dashboard/deploy/Deploy';
import TeamMember from './TeamMember';
import TeamMemberForm from './form/TeamMemberForm';
import { getTeamMembersByTeamId, deleteBatchTeamMembers } from '../../actions/team';
import './teamPage.css';
import { PrimaryButton, DangerButton } from '../shared/styledComponents';
import ConditionalWrapper from '../shared/ConditionalWrapper';
import TeamPageWalkthrough from './teamPageOnboarding';

const TeamPage = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const { loading, teamMembers } = useSelector((state) => state.teamMember);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [checkedMember, setCheckedMember] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  useEffect(() => {
    if (teamId) {
      dispatch(getTeamMembersByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  useEffect(() => {
    if (checkedMember.length === teamMembers.length) {
      setCheckAll(true);
    }
  }, [checkedMember]);

  const handleCheck = (memberId) => {
    if (checkedMember.includes(memberId)) {
      setCheckedMember(checkedMember.filter((checkedId) => checkedId !== memberId));
      return;
    }
    if (checkedMember.length === teamMembers.length) {
      setCheckAll(true);
    }
    setCheckedMember([...checkedMember, memberId]);
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setCheckedMember([]);
    } else {
      setCheckedMember(teamMembers.map((member) => member._id));
    }
    setCheckAll(!checkAll);
  };

  const handleDelete = () => {
    dispatch(deleteBatchTeamMembers(teamId, checkedMember));
    setCheckAll(false);
    setCheckedMember([]);
    setShowDeleteAll(false);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please select a team member to delete
    </Tooltip>
  );

  return (
    <div className="teamPageContainer">
      <div style={{ display: 'flex' }}>
        <h2 style={{ marginRight: '10px' }}> Team Members </h2>
        <TeamPageWalkthrough />
      </div>
      <PrimaryButton className="mt-2" onClick={() => setShowCreateForm(true)} id="add-team-member-button">
        Add Team Member
      </PrimaryButton>
      {' '}
      <ConditionalWrapper
        condition={checkedMember.length === 0}
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
            id="delete-team-members-button"
            className="mr-2"
            onClick={() => setShowDeleteAll(true)}
            disabled={checkedMember.length === 0}

          >
            <RiDeleteBin6Line />
            {' '}
            {checkedMember.length > 0 && checkedMember.length}
            {' '}
            Team Members
            {' '}
          </DangerButton>
        </div>
      </ConditionalWrapper>
      <div style={{ padding: '20px', fontSize: '17px' }}>
        <input
          id="select-team-members-checkbox"
          type="checkbox"
          checked={checkedMember.length === teamMembers.length}
          onChange={handleCheckAll}
        />
        {' '}
        Select All
        {' '}
      </div>

      <div className="text-center">
        {loading && <Spinner className="mt-5" animation="border" />}
      </div>

      {!loading && teamMembers.length === 0 ? (
        <Alert className="mt-3" variant="primary">
          There is no member for this team. Please add team members.
        </Alert>
      ) : (
        <CardDeck
          style={{
            margin: 'auto', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap',
          }}
          className="mb-4"
        >
          {teamMembers.map((member) => (
            <TeamMember member={member} key={member._id} setCheckedMember={handleCheck} checkedMember={checkedMember} />
          ))}
        </CardDeck>
      )}

      {/* A modal for showing create a team member */}
      <Modal show={showCreateForm} id="teamMemberModal">
        <Modal.Header className="teamMemberModalHeader">
          <Modal.Title className="teamMemberTitle"> New Team Member </Modal.Title>
        </Modal.Header>
        <Modal.Body className="teamMemberBody">
          <TeamMemberForm
            type="create"
            closeModal={() => setShowCreateForm(false)}
          />
        </Modal.Body>
      </Modal>

      {/* A modal for showing confirm delete message */}
      <Modal show={showDeleteAll}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Delete Publications </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          {' '}
          {checkedMember.length}
          {' '}
          team member(s)?
        </Modal.Body>
        <Modal.Footer>
          <PrimaryButton variant="light" onClick={() => setShowDeleteAll(false)}>
            {' '}
            Cancel
            {' '}
          </PrimaryButton>
          <DangerButton variant="danger" onClick={handleDelete}>
            {' '}
            Confirm
            {' '}
          </DangerButton>
        </Modal.Footer>
      </Modal>
      <DeployBtn
        teamId={teamId}
      />
    </div>
  );
};

export default TeamPage;
