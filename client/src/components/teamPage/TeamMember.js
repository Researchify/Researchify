/**
 * The TeamMember component displays a single team member details
 */

import {
  Card,
  Row,
  Col,
  Image,
  Modal,
} from 'react-bootstrap';
import { useState } from 'react';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import TeamMemberForm from './form/TeamMemberForm';
import { deleteTeamMember } from '../../actions/team';
import profilePic from '../../images/profilepic.jpg';
import {
  SecondaryButton,
  DangerButton,
  StyledButtonGroup,
  ButtonGroupItem,
} from '../shared/styledComponents';
import './teamMember.css';
import './teamPage.css';

const TeamMember = ({ member }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const teamId = useSelector((state) => state.team.teamId);

  const handleDelete = () => {
    dispatch(deleteTeamMember(teamId, member._id));
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
      <Card
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
        id="team-card"
        style={{
          margin: '8px', minWidth: '550px', maxWidth: '550px', height: '100%', backgroundColor: isHovering ? 'rgb(231, 229, 229)' : '#f8f9fa',
        }}
      >
        <Row>
          <Col md={3}>
            <Image
              src={profilePic}
              roundedCircle
              height="130px"
              width="130px"
              style={{ alignSelf: 'center', margin: '10px' }}
            />

          </Col>
          <Col md={9}>
            {
                isHovering
              && (
              <StyledButtonGroup className="float-right" style={{ margin: '5px' }}>
                <ButtonGroupItem color="#56658a" onClick={() => setShowUpdateForm(true)}><RiEdit2Line /></ButtonGroupItem>
                <ButtonGroupItem color="#9c503d" hoverBorderColor="#9c503d" hoverColor="white" onClick={() => setShowDeleteMessage(true)}>
                  <RiDeleteBin6Line />
                </ButtonGroupItem>
              </StyledButtonGroup>
              )
              }
            <Card.Body>
              <Card.Title>{member.fullName}</Card.Title>
              <Card.Subtitle className=" mb-2 text-muted">
                {member.position}
              </Card.Subtitle>
              <Card.Text>{member.summary}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

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
