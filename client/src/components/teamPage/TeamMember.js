/**
 * The TeamMember component displays a single team member details
 */

import {
  Card,
  Row,
  Col,
  Image,
  Modal,
  ButtonGroup,
  OverlayTrigger,
  Button,
} from 'react-bootstrap';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import TeamMemberForm from './form/TeamMemberForm';
import { deleteTeamMember } from '../../actions/team';
import profilePic from '../../images/profilepic.jpg';
import {
  SecondaryButton,
  DangerButton,
  OptionEditButton,
  RedDeleteButton,
} from '../shared/styledComponents';
import './teamMember.css';
import './teamPage.css';

const TeamMember = ({ member }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const teamId = useSelector((state) => state.team.teamId);

  const handleDelete = () => {
    dispatch(deleteTeamMember(teamId, member._id));
    setShowDeleteMessage(false);
  };

  const displayOptions = (
    <ButtonGroup>
      <OptionEditButton
        backgroundColor="white"
        onClick={() => setShowUpdateForm(true)}
        data-toggle="modal"
      >
        {' '}
        <AiFillEdit />
        {' '}
      </OptionEditButton>
      <RedDeleteButton
        backgroundColor="white"
        onClick={() => setShowDeleteMessage(true)}
        data-toggle="modal"
      >
        <AiFillDelete />
      </RedDeleteButton>
    </ButtonGroup>
  );

  return (
    <>
      <Col className="container-fluid mt-4">
        <Card id="team-card" bg="light" style={{ width: '25rem', height: '100%' }}>
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
                    value={{ color: '#56658a', size: '20px' }}
                  >
                    <BsThreeDotsVertical />
                  </IconContext.Provider>
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
          <Image
            src={profilePic}
            roundedCircle
            height="130px"
            width="130px"
            style={{ alignSelf: 'center' }}
          />
          <Card.Body>
            <Card.Title className="text-center">{member.fullName}</Card.Title>
            <Card.Subtitle className="text-center mb-2 text-muted">
              {member.position}
            </Card.Subtitle>
            <Card.Text>{member.summary}</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={showUpdateForm} id="teamMemberModal">
        <Modal.Header className="teamMemberModalHeader">
          <Modal.Title className="teamMemberTitle"> Edit Team Member </Modal.Title>
        </Modal.Header>
        <Modal.Body className="teamMemberBody">
          <TeamMemberForm
            type="update"
            member={member}
            closeModal={() => setShowUpdateForm(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteMessage} id="teamMemberModal">
        <Modal.Header className="teamMemberModalHeader">
          <Modal.Title> Delete Team Member </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this team member?
        </Modal.Body>
        <Modal.Footer>
          <SecondaryButton onClick={() => setShowDeleteMessage(false)}>
            {' '}
            Cancel
            {' '}
          </SecondaryButton>
          <DangerButton variant="danger" onClick={handleDelete}>
            {' '}
            Confirm
            {' '}
          </DangerButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// props validation
TeamMember.propTypes = {
  member: PropTypes.object.isRequired,
};

export default TeamMember;
