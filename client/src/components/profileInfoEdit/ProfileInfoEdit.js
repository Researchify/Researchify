/**
 * This file exports a profile page management component that displays the ability to edit user information
 */

import React from 'react';

import { Button, Form, Container, Image } from 'react-bootstrap';
import './ProfileInfoEdit.css';
import profilePic from '../../images/profilepic.jpg';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

/**
 * Update user profile
 */
const profileUpdated = () => {
  try {
    toast.success('Profile has been successfully updated');
  } catch (error) {
    console.error(error);
    toast.error('Profile has not been updated');
  }
};

const profileDeleted = () => {
  console.error(
    'Delete profile function is not implemented yet in ProfileInfoEdit.js'
  );
  toast.error('Profile has not been deleted');
};

/**
 * Form component for user update profile
 */
const ProfileInfoEdit = () => {
  const teamName = useSelector((state) => state.user?.teamName);
  const orgName = useSelector((state) => state.user?.orgName);
  const email = useSelector((state) => state.user?.email);
  // We dont store country and phone number at the moment
  // const country = useSelector((state) => state.user?.country);
  // const phoneNum = useSelector((state) => state.user?.phoneNum);

  return (
    <div className="mt-5">
      <Container className="profile-container">
        <Form className="profile-form">
          <p className="profile-title-name">Team Profile Management</p>

          <Form.Group controlId="formProfilePic">
            <Image
              src={profilePic}
              roundedCircle
              height="184px"
              width="184px"
            />
            <Form.Control type="file" />
            <Form.Text className="text-muted">
              Upload a file from your device, at least 184px.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formResearchGroupName">
            <Form.Label>Research Group Name</Form.Label>
            <Form.Control type="text" placeholder={teamName} />
          </Form.Group>

          <Form.Group controlId="formOrganisationName">
            <Form.Label>Organisation Name</Form.Label>
            <Form.Control type="text" placeholder={orgName} />
          </Form.Group>

          {/* <Form.Group controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control as="select" defaultValue={country}>
              <option>{country}</option>
              <option>Australia</option>
              <option>USA</option>
              <option>Canada</option>
            </Form.Control>
          </Form.Group> */}

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder={email} />
          </Form.Group>

          {/* <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder={phoneNum} />
          </Form.Group> */}

          <div className="my-1">
            <Button color="primary" className="mr-2" onClick={profileUpdated}>
              Update
            </Button>
            <Toaster />

            {/* Button is linked to react-router-dom Link*/}
            <Link to="/dashboard">
              <Button color="primary">Back</Button>
            </Link>
          </div>
          <div className="my-1">
            <Button variant="danger" onClick={profileDeleted}>
              Delete account
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProfileInfoEdit;
