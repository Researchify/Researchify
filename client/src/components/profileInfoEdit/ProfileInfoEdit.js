/**
 * This file exports a profile page management component that displays the ability to edit user information
 */

import React, { useState, useEffect } from 'react';

import { Button, Form, Container, Image } from 'react-bootstrap';
import './ProfileInfoEdit.css';
import profilePic from '../../images/profilepic.jpg';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { updateTeam } from '../../actions/team';


/**
 * Form component for user update profile
 */
const ProfileInfoEdit = () => {
  const dispatch = useDispatch(); 

  const { teamId, teamName, orgName, email } = useSelector((state) => state.team);

  const [profileData, setInputs] = useState({ teamName, orgName, email});

  useEffect(() => {
    setInputs({teamName, orgName, email})
  }, [email, orgName, teamName, teamId])
  
  const updateInputs = (form) => {
    const { name, value } = form.target;
    setInputs({ ...profileData, [name]: value });
  };

  const [validated, setValidated] = useState(false);
  const handleUpdate = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log(teamId, profileData)
      dispatch(updateTeam(teamId, profileData));
    }
    setValidated(true);
  };

  // const updateProfile = (teamId, profileData) => {
  //   try {
  //     dispatch(updateTeam(teamId, profileData))
  //     toast.success('Profile has been successfully updated');
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Profile has not been updated');
  //   }
  // };

  const profileDeleted = () => {
    console.error(
      'Delete profile function is not implemented yet in ProfileInfoEdit.js'
    );
    toast.error('Profile has not been deleted');
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
              defaultValue={profileData.teamName}
              onChange={updateInputs}
              required
              name="teamName"
            />
          </Form.Group>

          <Form.Group controlId="formOrganisationName">
            <Form.Label>Organisation Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your organisation name here"
              defaultValue={profileData.orgName}
              onChange={updateInputs}
              required
              name="orgName"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email here"
              name="email"
              defaultValue={profileData.email}
              onChange={updateInputs}
              required
            />
          </Form.Group>

          <div className="my-1">
            <Button
              id="updateButton"
              type="submit"
              color="primary"
              className="mr-2"
            >
              Update
            </Button>

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
