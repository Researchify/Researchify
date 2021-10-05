/**
 * This file exports a profile page management component that displays the ability to edit user information
 */

import React, { useState, useEffect } from 'react';

import {
  Form, Container, Image,
} from 'react-bootstrap';
import './ProfileInfoEdit.css';
import { useSelector, useDispatch } from 'react-redux';
import defaultProfilePic from '../../images/profilepic.jpg';
import { updateTeam } from '../../actions/team';
import ProfileResetModal from './ProfileResetModal';
import GhLogInModal from './GhLogInModal';
import { PrimaryButton, DangerButton } from '../shared/styledComponents';

/**
<<<<<<< HEAD:client/src/components/profileInfoEdit/ProfileInfoEdit.js
  * Form component for user update profile
  */
let deleteFlag = false;
const ProfileInfoEdit = () => {
=======
 * Form component for user update profile
 */
const Settings = () => {
>>>>>>> main:client/src/components/settings/Settings.js
  const dispatch = useDispatch();
  const [resetAlert, setResetAlert] = useState(false);
  const [logInAlert, setLogInAlert] = useState(false);

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
<<<<<<< HEAD:client/src/components/profileInfoEdit/ProfileInfoEdit.js
  const checkLogin = () => {
    const accessToken = localStorage.getItem('GH_access_token');
    if (accessToken === null) {
      setLogInAlert(true);
    }
  };
  const setDelete = (flag) => {
    deleteFlag = flag;
=======

  const profileDeleted = () => {
    // TODO: Delete profile function is not implemented yet in Settings.js
    toast.error('Profile has not been deleted');
>>>>>>> main:client/src/components/settings/Settings.js
  };

  return (
    <>
      <div className="mt-5">
        <Container className="profile-container">
          <div className="container-padding">
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
              <div className="mx-1">
                <PrimaryButton
                  id="updateButton"
                  type="submit"
                  color="primary"
                  className="my-2"
                >
                  Update
                </PrimaryButton>
              </div>
            </Form>
            <DangerButton
              variant="outline-danger"
              className="ml-1"
              style={{
                align: 'center',
              }}
              onClick={() => {
                checkLogin();
                setResetAlert(true);
                setDelete(false);
              }}
            >
              Reset Data
            </DangerButton>

            <DangerButton
              variant="outline-danger"
              className="ml-2"
              onClick={() => {
                checkLogin();
                setResetAlert(true);
                setDelete(true);
              }}
            >
              Delete account
            </DangerButton>
          </div>
        </Container>
      </div>
      <ProfileResetModal resetAlert={resetAlert} setResetAlert={setResetAlert} type={deleteFlag} />
      <GhLogInModal logInAlert={logInAlert} setLogInAlert={setLogInAlert} />
    </>
  );
};
<<<<<<< HEAD:client/src/components/profileInfoEdit/ProfileInfoEdit.js
export default ProfileInfoEdit;
=======

export default Settings;
>>>>>>> main:client/src/components/settings/Settings.js
