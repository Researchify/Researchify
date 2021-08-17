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

  const { teamId, teamName, orgName, email,password, confirmedPassword } = useSelector(
    (state) => state.team
  );

  const [profileData, setInputs] = useState({ teamName, orgName, email,password ,confirmedPassword});

  useEffect(() => {
    setInputs({ teamName, orgName, email,password,confirmedPassword  });
  }, [email, orgName, teamName]);

  const updateInputs = (form) => {
    const { name, value } = form.target;
    if (name !== "email" ){
      setInputs({ ...profileData, [name]: value });
    }
  };
  const checkPassword = function(){
    console.log({ ...profileData}.password);

    if (! ({...profileData}.password == {...profileData}.confirmedPassword)){
      return false;
    }
    var matches = {...profileData}.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
    if (matches == null){
      console.log("false");
      return false;
    }
    return true;

  };

  const [validated, setValidated] = useState(false);
  const handleUpdate = async (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
          event.stopPropagation();
      } else {
          if (({...profileData}.password || {...profileData}.confirmedPassword ) && ({...profileData}.password != "" || {...profileData}.confirmedPassword != "")) {
              if (!checkPassword()) {
                    setValidated(false);
                    alert("please enter a password with numbers, letters and characters, at least 8 chars long")
                    return;
              } else {
                  var newdata = {
                      "teamName": {...profileData}.teamName,
                      "orgName": {...profileData}.orgName,
                      "email": {...profileData}.email,
                      "password": {...profileData}.password
                  }
                  dispatch(updateTeam(teamId, newdata));
                  alert("a");
              }
          }else {
              var newdata = {
                  "teamName": {...profileData}.teamName,
                  "orgName": {...profileData}.orgName,
                  "email": {...profileData}.email
              }
              dispatch(updateTeam(teamId, newdata));
          }
      }
      setValidated(true);
  };

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
              readonly={"true"}
              placeholder="allenlab@gmail.com"
              name="email"
              defaultValue={profileData.email}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Password </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={profileData.password}
                onChange={updateInputs}
                validated={validated}

              />

          </Form.Group>
           <Form.Group>
            <Form.Label> Confirm Password </Form.Label>
              <Form.Control
                type="password"
                name="confirmedPassword"
                placeholder="Password"
                value={profileData.confirmedPassword}
                onChange={updateInputs}
                validated={validated}
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
