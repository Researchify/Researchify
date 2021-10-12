/**
 * The TeamMember component displays a single team member details
 */

import {
  Card,
  Image,
  Modal,
  Row,
  Col,
} from 'react-bootstrap';
import { useState } from 'react';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import TeamMemberForm from './form/TeamMemberForm';
import { deleteTeamMember } from '../../actions/team';
import defaultProfilePic from '../../images/profilepic.jpg';
import {
  SecondaryButton,
  DangerButton,
  StyledButtonGroup,
  ButtonGroupItem,
} from '../shared/styledComponents';
import './teamMember.css';
import './teamPage.css';

const TeamMember = ({ member, checkedMember, setCheckedMember }) => {
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

  // prevent clicking on inner div calling the outer div onclick function
  const childCallback = (event) => {
    event.stopPropagation();
    return false;
  };

  return (
    <>
      <Card
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
        id="team-card"
        onClick={() => setCheckedMember(member._id)}
        style={{
          margin: '15px', minWidth: '350px', maxWidth: '350px', height: '100%', backgroundColor: isHovering ? '#f5f2f2' : '#f8f9fa',
        }}
      >
        <Row>
          <Col md={3} xs={3}>
            <input
              style={{ marginTop: '12px', marginLeft: '12px' }}
              type="checkbox"
              checked={checkedMember.includes(member._id)}
            />
          </Col>
          <Col md={4} xs={4}>
            <Image
              src={member.memberPic ?? defaultProfilePic}
              roundedCircle
              height="130px"
              width="130px"
              style={{
                alignSelf: 'center',
                marginTop: '10px',
                marginLeft: '15px',
                objectFit: 'cover',
              }}
            />
          </Col>
          <Col>
            {
              isHovering
              && (
              <StyledButtonGroup onClick={childCallback} className="float-right" style={{ margin: '5px' }}>
                <ButtonGroupItem color="#56658a" onClick={() => setShowUpdateForm(true)}><RiEdit2Line /></ButtonGroupItem>
                <ButtonGroupItem color="#dc3545" hoverBorderColor="#dc3545" hoverColor="white" onClick={() => setShowDeleteMessage(true)}>
                  <RiDeleteBin6Line />
                </ButtonGroupItem>
              </StyledButtonGroup>
              )
              }
          </Col>
        </Row>

        <Card.Body>
          <Card.Title className="text-center">{member.fullName}</Card.Title>
          <Card.Subtitle className="text-center mb-2 text-muted">
            {member.position}
          </Card.Subtitle>
          <Card.Text className="text-center">{member.summary}</Card.Text>
        </Card.Body>
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
  checkedMember: PropTypes.array.isRequired,
  setCheckedMember: PropTypes.func.isRequired,
};

export default TeamMember;
