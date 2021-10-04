/**
 * This file exports a Registration Form component used to display registration input.
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Col, Form, Jumbotron, OverlayTrigger, Popover,
} from 'react-bootstrap';
import '../css/registration-form.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import { BsQuestionCircle } from 'react-icons/bs';
import { Button } from '@material-ui/core';
import { createTeam } from '../../../actions/team';

/**
 * Component that tell user the requirements of the password when hover.
 * @param props This variable is needed to pass placement position
 * @returns The tooltip/popover for password
 * TODO: Moved this into an individual file to reduce line numbers
 */
const StringPasswordHint = (props) => (
  <Popover id="strong-pw-hint" {...props}>
    <Popover.Content>
      Password must include:
      <br />
      {' '}
      - 8-20 characters
      <br />
      {' '}
      - At least 1 letter
      <br />
      {' '}
      - At least 1 number
    </Popover.Content>
  </Popover>
);

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const teamInfoSchema = yup.object({
    teamName: yup
      .string()
      .required('Team name is required')
      .min(3, 'Must be at least 3 characters'),
    orgName: yup
      .string()
      .required('Organization name is required')
      .min(3, 'Must be at least 3 characters'),
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(8, 'Password must contain at least 8 characters')
      .max(20, 'Password is too long')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
        'Password must be 8 or more characters with a mix of \nletters and numbers',
      ),
    confirmedPassword: yup
      .string()
      .required('Please re-enter your password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const initialTeamInfo = {
    teamName: '',
    orgName: '',
    email: '',
    password: '',
    confirmedPassword: '',
  };

  const submitForm = (values, { setFieldError }) => {
    const teamInfo = { ...values };
    delete teamInfo.confirmedPassword;
    // error message could be passed in the setFieldError function to show error on the form
    dispatch(createTeam(teamInfo, setFieldError));
  };

  return (
    <Jumbotron id="registration-form-box">
      <h3 id="signUpHeading">Sign Up</h3>
      <hr />
      <Formik
        enableReinitialize
        validationSchema={teamInfoSchema}
        onSubmit={submitForm}
        initialValues={initialTeamInfo}
      >
        {({
          handleSubmit, handleChange, values, touched, errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label> Team name </Form.Label>
                <Form.Control
                  type="text"
                  name="teamName"
                  placeholder="Team name"
                  value={values.teamName}
                  onChange={handleChange}
                  isInvalid={touched.teamName && errors.teamName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.teamName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label> Organization name </Form.Label>
                <Form.Control
                  type="text"
                  name="orgName"
                  placeholder="Organization name"
                  value={values.orgName}
                  onChange={handleChange}
                  isInvalid={touched.orgName && errors.orgName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orgName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label> Email address </Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Password
                {'  '}
                <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={StringPasswordHint}>
                  <BsQuestionCircle style={{ color: 'grey' }} />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid" style={{ whiteSpace: 'pre-wrap' }}>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label> Confirm Password </Form.Label>
              <Form.Control
                type="password"
                name="confirmedPassword"
                placeholder="Password"
                value={values.confirmedPassword}
                onChange={handleChange}
                isInvalid={touched.confirmedPassword && errors.confirmedPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmedPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <div>
              <Button
                id="submitButton"
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Sign Up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Jumbotron>
  );
};

export default RegistrationForm;
