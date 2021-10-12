/**
 * The Achievement component displays a single Achievement details
 */

import {
  Card,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import {
  DangerButton,
  SecondaryButton,
  StyledButtonGroup,
  ButtonGroupItem,
} from '../shared/styledComponents';
import './form/achievementForm.css';
import { AchievementsEditDeleteWalkthrough } from './achievementsOnboarding';
import AchievementForm from './form/AchievementForm';
import { deleteAchievement } from '../../actions/achievements';

const Achievement = ({ achievement, checkedAchievement, setCheckedAchievement }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleDelete = () => {
    dispatch(deleteAchievement(achievement._id));
    setShowDeleteMessage(false);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // prevent clicking on inner div calling the outer div onclick function
  const childCallback = (event) => {
    event.stopPropagation();
    return false;
  };

  return (
    <>
      <Row
        id="achievement"
        className="container-fluid mt-3"
      >
        <Card
          id="card"
          onMouseOver={handleMouseOver}
          onFocus={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onBlur={handleMouseLeave}
          onClick={() => setCheckedAchievement(achievement._id)}
        >
          <Card.Header as="h5" id="card-header">
            <Row>
              <Col>
                <Row>
                  <div style={{ display: 'flex' }}>
                    <div style={{ paddingTop: '5px' }}>
                      <input id="achievement-checkbox" type="checkbox" checked={checkedAchievement.includes(achievement._id)} />
                    </div>
                    <div id="achievementTitle">
                      {achievement.title}
                    </div>
                  </div>
                  <div style={{ paddingLeft: '10px' }}>
                    <AchievementsEditDeleteWalkthrough />
                  </div>
                </Row>
              </Col>
              <Col md={{ span: 3 }}>
                {
                  isHovering
                && (
                <StyledButtonGroup onClick={childCallback} className="float-right" style={{ padding: '0px' }}>
                  <ButtonGroupItem id="edit-achievement-button" color="#56658a" onClick={() => setShowUpdateForm(true)}><RiEdit2Line /></ButtonGroupItem>
                  <ButtonGroupItem id="delete-achievement-button" color="#dc3545" hoverBorderColor="#dc3545" hoverColor="white" onClick={() => setShowDeleteMessage(true)}>
                    <RiDeleteBin6Line />
                  </ButtonGroupItem>
                </StyledButtonGroup>
                )
                }
              </Col>
            </Row>
          </Card.Header>
          <Card.Body id="card-body" style={{ borderColor: '#56658a', backgroundColor: isHovering ? '#f5f2f2' : '#f8f9fa' }}>
            <Card.Text>{achievement.description}</Card.Text>
            <Card.Text id="yearAwarded">
              <b>Year:</b>
              {' '}
              {achievement.yearAwarded}
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>

      <Modal show={showUpdateForm}>
        <Modal.Header className="achievementModalHeader">
          <Modal.Title className="achievementsModalTitle"> Edit Achievement </Modal.Title>
        </Modal.Header>
        <Modal.Body className="achievementsModalBody">
          <AchievementForm
            type="update"
            achievement={achievement}
            closeModal={() => setShowUpdateForm(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteMessage}>
        <Modal.Header>
          <Modal.Title> Delete Achievement </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this achievement?
        </Modal.Body>
        <Modal.Footer>
          <div>
            <SecondaryButton
              onClick={() => setShowDeleteMessage(false)}
            >
              Cancel
            </SecondaryButton>
          </div>
          <div>
            <DangerButton
              onClick={handleDelete}
            >
              Confirm
            </DangerButton>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// props validation
Achievement.propTypes = {
  achievement: PropTypes.object.isRequired,
  checkedAchievement: PropTypes.array.isRequired,
  setCheckedAchievement: PropTypes.func.isRequired,
};

export default Achievement;
