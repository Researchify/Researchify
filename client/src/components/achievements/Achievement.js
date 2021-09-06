/**
 * The Achievement component displays a single Achievement details
 */

import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  ButtonGroup,
  OverlayTrigger,
} from 'react-bootstrap';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteAchievement } from '../../actions/achievements';
import AchievementForm from './form/AchievementForm';

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
      <Button
        onClick={() => setShowUpdateForm(true)}
        variant="primary"
        data-toggle="modal"
      >
        {' '}
        <AiFillEdit />
        {' '}
      </Button>
      <Button
        onClick={() => setShowDeleteMessage(true)}
        variant="danger"
        data-toggle="modal"
      >
        <AiFillDelete />
      </Button>
    </ButtonGroup>
  );

  return (
    <>
      <Row id="achievement" className="container-fluid mt-4">
        <Card>
          <Card.Header as="h5">
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
                      value={{ color: 'black', size: '20px' }}
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
        <Modal.Header className="modalHeader">
          <Modal.Title> Edit Achievement </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AchievementForm
            type="update"
            achievement={achievement}
            closeModal={() => setShowUpdateForm(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteMessage}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Delete Achievement </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this achievement?
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
    </>
  );
};

export default Achievement;
