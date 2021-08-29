/**
 * This component display a single team member as a card component.
 */

import React, {Fragment} from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import profilePicture from '../../../../shared/images/profilepic.jpg';


const TeamMember = ({member}) => {
  return (
      <Fragment>
          <Card className="team-card m-5 border-0 shadow " >
              <Row>
                  <Col >
                      <Card.Img src={profilePicture} className="team-member-picture" />
                  </Col>
                  <Col>
                      <Card.Body>
                          <Card.Title as="h5">{member.fullName}</Card.Title>
                          <Card.Text as="h6">
                              {member.position}
                          </Card.Text>
                          <Card.Text as="h7">
                              {member.summary}
                          </Card.Text>
                      </Card.Body>
                  </Col>
              </Row>
          </Card>

      </Fragment>


  )
}

export default TeamMember;
