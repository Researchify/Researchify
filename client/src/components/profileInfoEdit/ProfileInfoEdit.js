/**
 * This file exports a profile page management component that displays the ability to edit user information
 */


import React from "react";

import { Button, Form, Container, Image, InputGroup} from 'react-bootstrap';
import './ProfileInfoEdit.css';
import profilePic from '../../images/profilepic.jpg';
import {Link} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const profileUpdated = () => toast.success('Profile has been successfully updated')
const profileDeleted = () => toast.error('Profile has not been deleted')

const ProfileInfoEdit = () => {
        return (
            <div className='mt-5' >
                <Container className = "profile-container">
                    <Form className = "profile-form">
                        <p className = "profile-title-name">Team Profile Management</p>

                        <Form.Group controlId="formProfilePic">
                            <Image src={profilePic} roundedCircle height="184px" width="184px" />
                            <Form.Control type="file" />
                            <Form.Text className="text-muted">
                                Upload a file from your device, at least 184px.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formResearchGroupName">
                            <Form.Label>Research Group Name</Form.Label>
                            <Form.Control type="text" placeholder="Deep Hackers" />
                        </Form.Group>

                        <Form.Group controlId="formOrganisationName">
                            <Form.Label>Organisation Name</Form.Label>
                            <Form.Control type="text" placeholder="Monash University" />
                        </Form.Group>

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

                        <div className= "my-1">
                            <Button 
                                color="primary"
                                className= "mr-2"
                                onClick={profileUpdated}
                            >
                                Update
                            </Button>
                            <Toaster />
                            
                            {/* Button is linked to react-router-dom Link*/}
                            <Link to='/dashboard'>
                                <Button color="primary">
                                    Back
                                </Button>
                            </Link>
                        </div>
                        <div className="my-1">
                        <Button 
                            variant="danger"
                            onClick={profileDeleted}
                        >
                            Delete account
                        </Button>
                        </div>

                    </Form>
                </Container>
            </div>
        )
}

export default ProfileInfoEdit;
