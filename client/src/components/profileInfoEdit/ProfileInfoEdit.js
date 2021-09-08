/**
 * This file exports a profile page management component that displays the ability to edit user information
 */

import React, { useState, useEffect } from 'react';

import {
  Button, Form, Container, Image,
} from 'react-bootstrap';
import './ProfileInfoEdit.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import defaultProfilePic from '../../images/profilepic.jpg';
import { updateTeam } from '../../actions/team';

/**
 * Form component for user update profile
 */
const ProfileInfoEdit = () => {
  const dispatch = useDispatch();

  const {
    teamId, teamName, orgName, email, profilePic,
  } = useSelector(
    (state) => state.team,
  );

  const [profileData, setInputs] = useState({
    teamName, orgName, email, profilePic,
  });

  useEffect(() => {
    setInputs({
      teamName, orgName, email, profilePic,
    });
  }, [email, orgName, teamName, profilePic]);

  const updateInputs = (form) => {
    const { name, value } = form.target;
    setInputs({ ...profileData, [name]: value });
  };

  /**
   * Updates profile image field when user uploads file
  */

  // If profilePic is undefined, set a default profile pic
  if (!profileData.profilePic) {
    profileData.profilePic = defaultProfilePic;
  }

  const handleImageUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (e) => {
      setInputs({ ...profileData, profilePic: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const [validated, setValidated] = useState(false);
  const handleUpdate = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(updateTeam(teamId, profileData));
    }
    setValidated(true);
  };

  const profileDeleted = () => {
    // TODO: Delete profile function is not implemented yet in ProfileInfoEdit.js
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
              src={profileData.profilePic}
              roundedCircle
              height="184px"
              width="184px"
            />
            <Form.Control name="profilePic" type="file" accept="image/*" onChange={handleImageUpload} multiple={false} />
            <Form.Text className="text-muted">
              Upload a file from your device, at least 184px.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Research Group Name</Form.Label>
            <Form.Control
              className="placeholder-text"
              type="text"
              placeholder="Allan Lab"
              defaultValue={profileData.teamName}
              onChange={updateInputs}
              required
              name="teamName"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Organisation Name</Form.Label>
            <Form.Control
              className="placeholder-text"
              type="text"
              placeholder="Leiden University"
              defaultValue={profileData.orgName}
              onChange={updateInputs}
              required
              name="orgName"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="placeholder-text"
              type="email"
              placeholder="allenlab@gmail.com"
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

            {/* Button is linked to react-router-dom Link */}
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
