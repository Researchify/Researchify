/**
 * This component display a single team member as a card component.
 */

 import React, {Fragment} from 'react';
 import {Card, Row, Col, Container} from 'react-bootstrap';
 import profilePicture from '../../../../shared/images/profilepic.jpg';
 import { TEAM_MEMBERS } from '../../../../global/data';
 const teamMembers = TEAM_MEMBERS;



 const TeamMember = ({member}) => {
   return (
       <Fragment>
         <Container className="pages-top-padding ">
         <Card className = "shadow text-center" bg = {teamMembers.indexOf(member) % 2 === 0 ? "white" : "secondary"}  >
                       <Card.Body >
                       <Row>
                       <Card.Img style={{width: "160px", height: "120px"}}  src={profilePicture} className="team-member-picture " />
                       <Col>
                       <Card.Title as="h5">{member.fullName}</Card.Title>
                       <Card.Text as="h6"> {member.position} </Card.Text>
                       <Card.Text as="h7"> {member.summary} </Card.Text>
                       </Col>
                       </Row>
                       </Card.Body>
           </Card>
           </Container>
       </Fragment>
   )
 }

 export default TeamMember;
