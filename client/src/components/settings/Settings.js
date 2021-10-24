/**
 * This file exports a profile page management component that displays the ability to edit user information
 */

import React, { useState, useEffect } from 'react';

import {
  Form, Container, Image, Modal,
} from 'react-bootstrap';
import './Settings.css';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import defaultProfilePic from '../../images/profilepic.jpg';
import { updateTeam } from '../../actions/team';

import { PrimaryButton, DangerButton } from '../shared/styledComponents';
import UpdatePasswordForm from './UpdatePasswordForm';

/**
 * Form component for user update profile
 */
const Settings = () => {
  const dispatch = useDispatch();
  const [updatePasswordForm, setUpdatePasswordForm] = useState(false);

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
    // TODO: Delete profile function is not implemented yet in Settings.js
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

            <PrimaryButton type="button" onClick={() => setUpdatePasswordForm(true)}>Change Password</PrimaryButton>
          </div>
          <div className="my-1">
            <DangerButton onClick={profileDeleted}>
              Delete account
            </DangerButton>
          </div>
        </Form>
      </Container>
      <div />

      {/* A modal for showing import publication form */}
      <Modal size="lg" show={updatePasswordForm}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Update Password </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdatePasswordForm closeModal={() => setUpdatePasswordForm(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Settings;
