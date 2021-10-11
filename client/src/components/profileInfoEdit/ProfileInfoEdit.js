/**
 * This file exports a profile page management component that displays the ability to edit user information
 */

import React, { useState, useEffect } from 'react';

import {
  Form, Container, Image,
} from 'react-bootstrap';
import './ProfileInfoEdit.css';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import defaultProfilePic from '../../images/profilepic.jpg';
import { updateTeam } from '../../actions/team';

import { PrimaryButton, DangerButton } from '../shared/styledComponents';
import UpdatePasswordForm from './UpdatePasswordForm';

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

  const [profileData, setProfileData] = useState({
    teamName, orgName, email, profilePic,
  });

  useEffect(() => {
    setProfileData({
      teamName, orgName, email, profilePic,
    });
  }, [email, orgName, teamName, profilePic]);

  const updateInputs = (form) => {
    const { name, value } = form.target;
    setProfileData({ ...profileData, [name]: value });
  };

  /**
   * Updates profile image field when user uploads file
  */

  // If profilePic is undefined, set a default profile pic
  profileData.profilePic = profileData.profilePic ?? defaultProfilePic;

  /* eslint-disable no-shadow */
  const handleImageUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (e.target.files[0]) {
      reader.onload = (e) => {
        setProfileData({ ...profileData, profilePic: e.target.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const [validated, setValidated] = useState(false);
  const handleUpdate = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newdata = {
        teamName: profileData.teamName,
        orgName: profileData.orgName,
        email: profileData.email,
      };
      dispatch(updateTeam(teamId, newdata));
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
          <p className="profile-title-name">Account Settings</p>

          <Form.Group controlId="formProfilePic">
            <Image
              className="profile-img"
              src={profileData.profilePic}
              roundedCircle
            />
            <Form.Label className="upload-label">
              Change Profile Photo
            </Form.Label>
            <Form.Control className="profile-pic" type="file" accept="image/*" onChange={handleImageUpload} multiple={false} name="profilePic" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="placeholder-text"
              type="email"
              readonly="true"
              placeholder="allenlab@gmail.com"
              name="email"
              defaultValue={profileData.email}
              required
            />
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

          <div className="my-1">
            <PrimaryButton
              id="updateButton"
              type="submit"
              color="primary"
              className="mr-2"
            >
              Update
            </PrimaryButton>

            {/* Button is linked to react-router-dom Link */}
            <Link to="/dashboard">
              <PrimaryButton color="primary">Back</PrimaryButton>
            </Link>
          </div>
          <div className="my-1">
            <DangerButton onClick={profileDeleted}>
              Delete account
            </DangerButton>
          </div>
        </Form>
      </Container>
      <div />
      <UpdatePasswordForm />
    </div>
  );
};

export default ProfileInfoEdit;
