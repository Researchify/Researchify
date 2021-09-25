/**
 * This component display a single team member as a card component.
 */

import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import profilePicture from '../../../../shared/images/profilepic.jpg';

const TeamMember = ({ member }) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <Card
      style={{
        marginBottom: '15px',
        width: '100%',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        backgroundColor: isHovering ? 'var(--researchify-color-tertiary)' : 'var(--researchify-color-secondary)',
      }}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
    >
      <Row>
        <Col md={4} sm={4} xs={4}>
          <Card.Img src={profilePicture} />
        </Col>
        <Col md={8} sm={8} xs={8}>
          <Card.Body>
            <Card.Title as="h5">{member.fullName}</Card.Title>
            <Card.Text as="h6">
              {member.position}
            </Card.Text>
            <Card.Text as="h7" style={{ color: isHovering ? 'var(--researchify-text-color)' : 'var(--researchify-text-color-secondary)' }}>
              {member.summary}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default TeamMember;
