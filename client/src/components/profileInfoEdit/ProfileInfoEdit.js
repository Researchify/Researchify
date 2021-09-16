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
import * as yup from 'yup';
import defaultProfilePic from '../../images/profilepic.jpg';
import { updateTeam, updatePassword } from '../../actions/team';

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

  const [profileDataPassword, setprofileDataPassword] = useState({});
  const [errors, setErrors] = useState({});

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

  const setPassword = (field, value) => {
    setprofileDataPassword({
      ...profileDataPassword,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Use 8 or more characters with a mix of letters, numbers & symbols',
      ),
    confirmedPassword: yup
      .string()
      .required('Please re-enter your password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const checkPassword = async () => {
    const { password, confirmedPassword } = profileDataPassword;

    const valid = await passwordSchema.isValid({
      password,
      confirmedPassword,
    });
    if (valid) {
      return true;
    }
    return false;
  };

  const findFormErrors = async () => {
    const newErrors = {};
    // name errors
    if (!await checkPassword()) {
      newErrors.password = 'Please enter a password at least 8 chars long, using only numbers, letters and characters';
    }
    if ({ ...profileDataPassword }.password !== { ...profileDataPassword }.confirmedPassword) {
      newErrors.confirmedPassword = ' Passwords do not match';
    } if ({ ...profileDataPassword }.currentPassword === '' || { ...profileDataPassword }.currentPassword === null) {
      newErrors.currentPassword = ' Please enter a current password';
    }
    return newErrors;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = await findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      setErrors(newErrors);

      const newdata = {
        currentPassword: { ...profileDataPassword }.currentPassword,
        password: { ...profileDataPassword }.password,
      };
      dispatch(updatePassword(teamId, newdata, ' Password has been updated'));
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
        teamName: { ...profileData }.teamName,
        orgName: { ...profileData }.orgName,
        email: { ...profileData }.email,
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
      <div />
      <p> </p>
      <Container className="profile-container">
        <Form
          className="profile-form"
          noValidate
          onSubmit={handleUpdatePassword}
        >
          <p className="profile-title-name">Team Password update</p>

          <Form.Group>
            <Form.Label>Current Password </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={profileDataPassword.currentPassword}
              onChange={(e) => setPassword('currentPassword', e.target.value)}
              isInvalid={!!errors.currentPassword}
            />
            <Form.Control.Feedback type="invalid">
              { errors.password }
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Group>
            <Form.Label> New Password </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={profileDataPassword.password}
              onChange={(e) => setPassword('password', e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              { errors.password }
            </Form.Control.Feedback>

          </Form.Group>
          <Form.Group>
            <Form.Label> Confirm Password </Form.Label>
            <Form.Control
              type="password"
              name="confirmedPassword"
              placeholder="Password"
              value={profileDataPassword.confirmedPassword}
              onChange={(e) => setPassword('confirmedPassword', e.target.value)}
              isInvalid={!!errors.confirmedPassword}
            />
            <Form.Control.Feedback type="invalid">
              { errors.confirmedPassword }
            </Form.Control.Feedback>
          </Form.Group>
          <div className="my-1">
            <Button
              id="updateButtonPassword"
              type="submit"
              color="primary"
              className="mr-2"
            >
              Update Password
            </Button>
          </div>
        </Form>

      </Container>
    </div>
  );
};

export default ProfileInfoEdit;
