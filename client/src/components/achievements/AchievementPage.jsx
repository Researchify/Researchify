/**
 * The AchievementPage component displays the team Achievement page
 */

import {
  Row, Col, Container, CardDeck, Modal, Spinner, Alert,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import AchievementForm from './achievementsComponents/AchievementForm';
import { getAchievementsByTeamId } from '../../actions/achievements';
import Achievement from './Achievement';
import './achievementPage.css';
import './css/achievementForm.css';
import AchievementsLayout from './AchievementsLayout';
import AddButton from './achievementsComponents/AddButton';

const AchievementPage = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (teamId) {
      dispatch(getAchievementsByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  const { loading, achievements } = useSelector((state) => state.achievements);

  return (
    <AchievementsLayout button={AddButton()}>
      <div className="achievementPageContainer">
        <Row className="container-fluid mt-4">
          <Col>
            <h1>Achievements</h1>
          </Col>
          <Col id="achievementButton" md={{ offset: 4 }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => setShowCreateForm(true)}
            >
              Add Achievement
            </Button>
          </Col>
        </Row>
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
                <Achievement achievement={achievement} key={achievement._id} />
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
      </div>
    </AchievementsLayout>
  );
};

export default AchievementPage;
