/**
 * The Achievement component displays a single Achievement details
 */

import {
  Card,
  Row,
  Col,
  Modal,
  ButtonGroup,
  OverlayTrigger,
} from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  PrimaryButton,
  SecondaryButton,
  OptionEditButton,
  OptionDeleteButton,
} from '../shared/styledComponents';
import './form/achievementForm.css';
import { deleteAchievement } from '../../actions/achievements';
import AchievementForm from './form/AchievementForm';
import { SecondaryButton, DangerButton } from '../shared/styledComponents';

const Achievement = ({ achievement }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const handleDelete = () => {
    dispatch(deleteAchievement(achievement._id));
    setShowDeleteMessage(false);
  };

  const displayOptions = (
    <ButtonGroup>
      <OptionEditButton
        onClick={() => setShowUpdateForm(true)}
        data-toggle="modal"
      >
        {' '}
        <AiFillEdit />
        {' '}
      </OptionEditButton>
      <OptionDeleteButton
        onClick={() => setShowDeleteMessage(true)}
        data-toggle="modal"
      >
        <AiFillDelete />
      </OptionDeleteButton>
    </ButtonGroup>
  );

  return (
    <>
      <Row id="achievement" className="container-fluid mt-4">
        <Card id="card">
          <Card.Header as="h5" id="card-header">
            <Row>
              <Col id="achievementTitle">{achievement.title}</Col>
              <Col md={{ span: 1 }}>
                <OverlayTrigger
                  rootClose
                  trigger="click"
                  placement="bottom"
                  overlay={displayOptions}
                >
                  <Button variant="default">
                    <IconContext.Provider
                      value={{ color: 'white', size: '20px' }}
                    >
                      <BsThreeDotsVertical />
                    </IconContext.Provider>
                  </Button>
                </OverlayTrigger>
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
            <PrimaryButton
              onClick={handleDelete}
            >
              Confirm
            </PrimaryButton>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// props validation
Achievement.propTypes = {
  achievement: PropTypes.object.isRequired,
};

export default Achievement;
