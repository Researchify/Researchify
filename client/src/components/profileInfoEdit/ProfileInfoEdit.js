/**
 * This file exports a profile page management component that displays the ability to edit user information
 */

import React, { useState, useEffect } from 'react';

import {
  Button, Form, Container, Image,
} from 'react-bootstrap';
import './ProfileInfoEdit.css';
import { useSelector, useDispatch } from 'react-redux';
import profilePic from '../../images/profilepic.jpg';
import { updateTeam } from '../../actions/team';
import ProfileResetModal from './ProfileResetModal';
import GhLogInModal from './GhLogInModal';
/**
 * Form component for user update profile
 */
let deleteFlag = false;
const ProfileInfoEdit = () => {
  const dispatch = useDispatch();
  const [resetAlert, setResetAlert] = useState(false);
  const [logInAlert, setLogInAlert] = useState(false);

  const {
    teamId, teamName, orgName, email,
  } = useSelector(
    (state) => state.team,
  );

  const [profileData, setInputs] = useState({ teamName, orgName, email });

  useEffect(() => {
    setInputs({ teamName, orgName, email });
  }, [email, orgName, teamName]);

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
      dispatch(updateTeam(teamId, profileData));
    }
    setValidated(true);
  };
  const checkLogin = () => {
    const accessToken = localStorage.getItem('GH_access_token');
    if (accessToken === null) {
      setLogInAlert(true);
    }
  };
  const setDelete = (flag) => {
    deleteFlag = flag;
  };

  return (
    <>
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

              <Button
                id="clearButton"
                color="primary"
                className="mr-2"
                onClick={() => {
                  checkLogin();
                  setResetAlert(true);
                  setDelete(false);
                }}
              >
                Clear Data
              </Button>

            </div>
            <div className="my-1">
              <Button
                variant="danger"
                onClick={() => {
                  checkLogin();
                  setResetAlert(true);
                  setDelete(true);
                }}
              >
                Delete account
              </Button>
            </div>
          </Form>
        </Container>
      </div>
      <ProfileResetModal resetAlert={resetAlert} setResetAlert={setResetAlert} type={deleteFlag} />
      <GhLogInModal logInAlert={logInAlert} setLogInAlert={setLogInAlert} />
    </>
  );
};
export default ProfileInfoEdit;
