/**
 * This file exports a profile page management component that displays the ability to edit user information
 */


import React from "react";

import { Button, Form, Row, Col, Container, Image} from 'react-bootstrap';
import './ProfileInfoEdit.css';
import profilePic from './profilepic.jpg';

function ProfileInfoEdit () {

        return (
            <div className="profile-center">
                <Container className = "profile-container">
                    <Form className = "profile-form">
                        <p className = "profile-title-name">Edit Profile</p>

                        <Form.Group controlId="formProfilePic">
                            <Image src={profilePic} roundedCircle height="184px" width="184px" />
                            <Form.Control type="file" />
                            <Form.Text className="text-muted">
                                Upload a file from your device, at least 184px.
                            </Form.Text>
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId="formUserFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="John" />
                                </Form.Group>
                            </Col>
                            
                            <Col>
                                <Form.Group controlId="formUserLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Doe" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control as="select" defaultValue="Australia">
                                        <option>Australia</option>
                                        <option>USA</option>
                                        <option>Canada</option>
                                    </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="john.doe@gmail.com" />
                        </Form.Group>

                        <Form.Group controlId="formPhoneNumber">
                             <Form.Label>Phone Number</Form.Label>
                             <Form.Control type="text" placeholder="+62123456789" />
                        </Form.Group>

                        <Button 
                            color="primary"
                            onClick={(event) => {
                                event.preventDefault();
                                alert('You have updated your profile')
                                /**
                                 * Update user information here onclick button
                                 */
                            }}
                        >
                            Update
                        </Button>{' '}

                        <a class="btn btn-primary" href="/dashboard" role="button">Back</a>

                    </Form>
                </Container>
            </div>
        )
}

export default ProfileInfoEdit;
