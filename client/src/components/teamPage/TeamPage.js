/**
 * The TeamPage component displays the team member page
 */

import {
  Container, CardDeck, Modal, Spinner, Alert,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import React, { useEffect, useState } from 'react';
import TeamMember from './TeamMember';
import TeamMemberForm from './form/TeamMemberForm';
import { getTeamMembersByTeamId } from '../../actions/team';
import './teamPage.css';
import { PrimaryButton } from '../shared/styledComponents';

const TeamPage = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (teamId) {
      dispatch(getTeamMembersByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  const { loading, teamMembers } = useSelector((state) => state.teamMember);

  return (
    <div className="teamPageContainer">
      <h2>Team Members</h2>
      <PrimaryButton className="mt-2" onClick={() => setShowCreateForm(true)}>
        Add Team Member
      </PrimaryButton>

      <div className="text-center">
        {loading && <Spinner className="mt-5" animation="border" />}
      </div>

      {!loading && teamMembers.length === 0 ? (
        <Alert className="mt-3" variant="primary">
          There is no member for this team. Please add team members.
        </Alert>
      ) : (
        <Container>
          <CardDeck
            style={{ display: 'flex', flexDirection: 'row' }}
            className="mt-4 mb-4"
          >
            {teamMembers.map((member) => (
              <TeamMember member={member} key={member._id} />
            ))}
          </CardDeck>
        </Container>
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
    </div>
  );
};

export default TeamPage;
