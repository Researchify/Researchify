/**
 * The AchievementPage component displays the team Achievement page
 */

import {
  Container, CardDeck, Modal, Spinner, Alert,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AchievementForm from './form/AchievementForm';
import { getAchievementsByTeamId } from '../../actions/achievements';
import Achievement from './Achievement';
import './achievementPage.css';
import './form/achievementForm.css';
import { PrimaryButton, DangerButton } from '../shared/styledComponents';

const AchievementPage = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const { loading, achievements } = useSelector((state) => state.achievements);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [checkedAchievement, setCheckedAchievement] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  useEffect(() => {
    if (teamId) {
      dispatch(getAchievementsByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  useEffect(() => {
    if (checkedAchievement.length === achievements.length) {
      setCheckAll(true);
    }
  }, [checkedAchievement]);

  const handleCheck = (achivementId) => {
    if (checkedAchievement.includes(achivementId)) {
      setCheckedAchievement(checkedAchievement.filter((checkedId) => checkedId !== achivementId));
      return;
    }
    if (checkedAchievement.length === achievements.length) {
      setCheckAll(true);
    }
    setCheckedAchievement([...checkedAchievement, achivementId]);
  };

  const handleDelete = () => {
    // dispatch(deleteBatchTeamMembers(teamId, checkedMember));
    console.log(teamId, checkedAchievement);
    setCheckAll(false);
    setCheckedAchievement([]);
    setShowDeleteAll(false);
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setCheckedAchievement([]);
    } else {
      setCheckedAchievement(achievements.map((member) => member._id));
    }
    setCheckAll(!checkAll);
  };

  return (
    <div className="achievementPageContainer">
      <h2>Achievements</h2>
      <PrimaryButton
        className="mt-2"
        onClick={() => setShowCreateForm(true)}
      >
        Add Achievement
      </PrimaryButton>
      {' '}
      <DangerButton
        onClick={() => setShowDeleteAll(true)}
        disabled={checkedAchievement.length === 0}
      >
        <RiDeleteBin6Line />
        {' '}
        {checkedAchievement.length > 0 && checkedAchievement.length}
        {' '}
        Achievements
        {' '}
      </DangerButton>

      <div style={{ padding: '20px', fontSize: '17px' }}>
        <input type="checkbox" checked={checkedAchievement.length === achievements.length} onChange={handleCheckAll} />
        {' '}
        { checkedAchievement.length === achievements.length ? 'De-Select All' : 'Select All'}
        {' '}
      </div>

      <div className="text-center">
        {loading && <Spinner className="mt-5" animation="border" />}
      </div>

      {!loading && achievements.length === 0 ? (
        <Alert className="mt-3" variant="primary">
          There are no achievements to show at this moment. Add an Achievement!
        </Alert>
      ) : (
        <Container>
          <CardDeck
            style={{ display: 'flex', flexDirection: 'row' }}
            className="mt-4 mb-4"
          >
            {achievements.map((achievement) => (
              <Achievement achievement={achievement} key={achievement._id} checkedAchievement={checkedAchievement} setCheckedAchievement={handleCheck} />
            ))}
          </CardDeck>
        </Container>
      )}

      {/* A modal for showing create an Achievement */}
      <Modal show={showCreateForm} id="achievementsModal">
        <Modal.Header>
          <Modal.Title className="achievementsModalTitle"> New Achievement </Modal.Title>
        </Modal.Header>
        <Modal.Body className="achievementsModalBody">
          <AchievementForm
            type="create"
            closeModal={() => setShowCreateForm(false)}
          />
        </Modal.Body>
      </Modal>

      {/* A modal for showing confirm delete message */}
      <Modal show={showDeleteAll}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Delete Achievements </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          {' '}
          {checkedAchievement.length}
          {' '}
          Achievements(s)?
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

export default AchievementPage;
