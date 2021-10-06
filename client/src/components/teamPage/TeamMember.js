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

  return (
    <>
      <Card
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
        onClick={() => setCheckedMember(member._id)}
        id="team-card"
        style={{
          margin: '8px', minWidth: '550px', maxWidth: '550px', height: '100%', backgroundColor: isHovering ? 'rgb(231, 229, 229)' : '#f8f9fa',
        }}
      >
        <Row>
          <Col md={8}>
            <input style={{ marginTop: '12px', marginLeft: '12px' }} type="checkbox" checked={checkedMember.includes(member._id)} />
            <Card.Body style={{ paddingRight: '2px' }}>
              <Card.Title>{member.fullName}</Card.Title>
              <Card.Subtitle className=" mb-2 text-muted">
                {member.position}
              </Card.Subtitle>
              <Card.Text>{member.summary}</Card.Text>
            </Card.Body>

          </Col>
          <Col md={4}>
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
            <Card.Body style={{ padding: '5px' }}>
              <Image
                src={profilePic}
                roundedCircle
                height="130px"
                width="130px"
                style={{ marginTop: !isHovering && '43px' }}
              />
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
  checkedMember: PropTypes.array.isRequired,
  setCheckedMember: PropTypes.func.isRequired,
};

export default TeamMember;
