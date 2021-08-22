/**
 * The Achievement component displays a single Achievement details
 */

 import {
    Card,
    Row,
    Col,
    Button,
    Image,
    Modal,
    ButtonGroup,
    OverlayTrigger,
  } from 'react-bootstrap';
  import awardPic from '../../images/profilepic.jpg';
  import { useState } from 'react';
  import { BsThreeDotsVertical } from 'react-icons/bs';
  import { IconContext } from 'react-icons';
  import AchievementForm from './form/AchievementForm';
  import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
  import { deleteAchievement } from '../../actions/achievements';
  import { useSelector, useDispatch } from 'react-redux';
  
  const Achievement = ({ achievement }) => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const teamId = useSelector((state) => state.team.teamId);

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
          <AiFillEdit />{' '}
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
        <Col className="container-fluid mt-4">
          <Card>
            <Card.Header as="h5">
              <Row>
                <Col id="achievementTitle">{achievement.title}</Col>
                <Col md={{ span: 2 }}>
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
              <Card.Text id="yearAwarded"><b>Date:</b> {achievement.yearAwarded}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
  
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
              Cancel{' '}
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              {' '}
              Confirm{' '}
            </Button>
          </Modal.Footer>  
        </Modal>
      </>
    );
  };
  
  export default Achievement;
  