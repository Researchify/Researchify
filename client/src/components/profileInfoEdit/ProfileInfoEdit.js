/**
 * This file exports a profile page management component that displays the ability to edit user information
 */

import React, { useState } from 'react';

import { Button, Form, Container, Image } from 'react-bootstrap';
import './ProfileInfoEdit.css';
import profilePic from '../../images/profilepic.jpg';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import api from '../../api/api';

/**
 * Update user profile
 */
const updateProfile = (teamId, profileData) => {
  try {
    api.patch(`team/${teamId}`, {
      teamName: profileData.teamName,
      orgName: profileData.orgName,
      // email: profileData.email,
    });
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
  const teamId = useSelector((state) => state.user?.teamName);

  const [profileData, setInputs] = useState({
    teamName: useSelector((state) => state.user?.teamName),
    orgName: useSelector((state) => state.user?.orgName),
    // email: useSelector((state) => state.user?.email),
    // country: useSelector((state) => state.user?.country);
  });
  const updateInputs = (form) => {
    const { name, value } = form.target;
    setInputs({ ...profileData, [name]: value });
  };

  const [validated, setValidated] = useState(false);
  const handleUpdate = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      updateProfile(teamId, profileData);
    }
    setValidated(true);
  };

  return (
    <div className="mt-5">
      <Container className="profile-container">
        <Form
          className="profile-form"
          noValidate
          validated={validated}
          onSubmit={handleUpdate}
        >
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
            <Form.Control
              type="text"
              placeholder="Enter your group name here"
              value={profileData.teamName}
              onchange={updateInputs}
              required
              name="teamName"
            />
          </Form.Group>

          <Form.Group controlId="formOrganisationName">
            <Form.Label>Organisation Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your organisation name here"
              value={profileData.orgName}
              onchange={updateInputs}
              required
              name="orgName"
            />
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

          {/* <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email here"
              value={profileData.email}
              onchange={updateInputs}
              required
              name="email"
            />
          </Form.Group> */}

          <div className="my-1">
            <Button
              id="updateButton"
              type="submit"
              color="primary"
              className="mr-2"
            >
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
