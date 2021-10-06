/**
 * The TeamPage component displays the team member page
 */

import {
  CardDeck, Modal, Spinner, Alert,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import TeamMember from './TeamMember';
import TeamMemberForm from './form/TeamMemberForm';
import { getTeamMembersByTeamId, deleteBatchTeamMembers } from '../../actions/team';
import './teamPage.css';
import { PrimaryButton, ButtonGroupItem, DangerButton } from '../shared/styledComponents';

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

  const handleCheck = (memberId) => {
    if (checkedMember.includes(memberId)) {
      setCheckedMember(checkedMember.filter((checkedId) => checkedId !== memberId));
      return;
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

  return (
    <div className="teamPageContainer">
      <h2>Team Members</h2>
      <PrimaryButton className="mt-2" onClick={() => setShowCreateForm(true)}>
        Add Team Member
      </PrimaryButton>
      <div style={{ padding: '20px', fontSize: '17px' }}>
        <input type="checkbox" checked={checkedMember.length === teamMembers.length} onChange={handleCheckAll} />
        {' '}
        { checkedMember.length > 0 ? (
          <>
            <ButtonGroupItem
              borderColor="#9c503d"
              color="#9c503d"
              hoverBorderColor="#9c503d"
              hoverColor="white"
              onClick={() => setShowDeleteAll(true)}
            >
              <RiDeleteBin6Line />
              {' '}
              {checkedMember.length}
              {' '}
              Team Members
              {' '}
            </ButtonGroupItem>
          </>
        )
          : 'Select All'}

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
    </div>
  );
};

export default TeamPage;
