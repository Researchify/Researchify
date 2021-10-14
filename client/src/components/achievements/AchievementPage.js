/**
 * The AchievementPage component displays the team Achievement page
 */

import {
  Container, CardDeck, Modal, Spinner, Alert, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeployBtn from '../dashboard/deploy/Deploy';
import AchievementForm from './form/AchievementForm';
import { getAchievementsByTeamId, deleteBatchAchievements } from '../../actions/achievements';
import Achievement from './Achievement';
import './achievementPage.css';
import './form/achievementForm.css';
import AchievementsPageWalkthrough from './achievementsOnboarding';
import { PrimaryButton, DangerButton } from '../shared/styledComponents';
import ConditionalWrapper from '../shared/ConditionalWrapper';

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
    dispatch(deleteBatchAchievements(checkedAchievement));
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

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please select a achievement to delete
    </Tooltip>
  );

  return (
    <div className="achievementPageContainer">
      <div style={{ display: 'flex' }}>
        <h2 style={{ marginRight: '10px' }}> Achievements </h2>
        <AchievementsPageWalkthrough />
      </div>
      <PrimaryButton
        id="add-achievement-button"
        className="mt-2"
        onClick={() => setShowCreateForm(true)}
      >
        Add Achievement
      </PrimaryButton>
      {' '}

      <ConditionalWrapper
        condition={checkedAchievement.length === 0}
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
            id="delete-icon"
            className="mr-2"
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
        </div>
      </ConditionalWrapper>

      <div style={{ padding: '20px', fontSize: '17px' }}>
        <input id="select-achievements-checkbox" type="checkbox" checked={checkedAchievement.length === achievements.length} onChange={handleCheckAll} />
        {' '}
        Select All
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
            className="mt-2 mb-4"
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
          Achievement(s)?
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

export default AchievementPage;
