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
} from '../shared/styledComponents';
import './form/achievementForm.css';
import { deleteAchievement } from '../../actions/achievements';
import AchievementForm from './form/AchievementForm';
import { StyledButtonGroup, ButtonGroupItem } from '../publications/publicationsLayout/PublicationsEditor';

const Achievement = ({ achievement, checkedAchievement, setCheckedAchievement }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  console.log(checkedAchievement);

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

  return (
    <>
      <Row
        id="achievement"
        className="container-fluid mt-4"
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
        onClick={() => setCheckedAchievement(achievement._id)}
      >
        <Card id="card">
          <Card.Header as="h5" id="card-header">
            <Row>
              <Col>
                <div style={{ display: 'flex' }}>
                  <div style={{ paddingTop: '5px' }}>
                    <input type="checkbox" checked={checkedAchievement.includes(achievement._id)} />
                  </div>
                  <div id="achievementTitle">
                    {achievement.title}
                  </div>
                </div>
              </Col>
              <Col md={{ span: 3 }}>
                {
                  isHovering
                && (
                <StyledButtonGroup className="float-right" style={{ padding: '1px' }}>
                  <ButtonGroupItem color="#56658a" onClick={() => setShowUpdateForm(true)}><RiEdit2Line /></ButtonGroupItem>
                  <ButtonGroupItem color="#dc3545" hoverBorderColor="#dc3545" hoverColor="white" onClick={() => setShowDeleteMessage(true)}>
                    <RiDeleteBin6Line />
                  </ButtonGroupItem>
                </StyledButtonGroup>
                )
                }
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Text>{achievement.description}</Card.Text>
            <Card.Text id="yearAwarded">
              <b>Date:</b>
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
