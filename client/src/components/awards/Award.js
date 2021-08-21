/**
 * The Award component displays a single Achievement details
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
  import AwardForm from './form/AwardForm';
  import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
  import { deleteAchievement } from '../../actions/achievements';
  import { useSelector, useDispatch } from 'react-redux';
  
  const Award = ({ award }) => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const teamId = useSelector((state) => state.team.teamId);

    const handleDelete = () => {
      dispatch(deleteAchievement(award._id));
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
          <Card bg="light" style={{ width: '25rem', height: '100%' }}>
            <Row>
              <Col md={{ span: 2, offset: 10 }}>
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
            <Image
              src={awardPic}
              roundedCircle
              height="130px"
              width="130px"
              style={{ alignSelf: 'center' }}
            />
            <Card.Body>
              <Card.Title className="text-center">{award.title}</Card.Title>
              <Card.Subtitle className="text-center mb-2 text-muted">
                {award.year}
              </Card.Subtitle>
              <Card.Text>{award.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
  
        <Modal show={showUpdateForm}>
          <Modal.Header className="modalHeader">
            <Modal.Title> Edit Award </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AwardForm
              type="update"
              award={award}
              closeModal={() => setShowUpdateForm(false)}
            />
          </Modal.Body>
        </Modal>
  
        <Modal show={showDeleteMessage}>
          <Modal.Header className="modalHeader">
            <Modal.Title> Delete Award </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this award?
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
  
  export default Award;
  