/**
 * This file exports a Registration Form component used to display registration input.
 */

import React, { useEffect } from 'react';
import { Col, Form, Jumbotron } from 'react-bootstrap';
import '../css/registration-form.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-ui/core';
import { createTeam } from '../../../actions/team';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (logIn) {
      history.push('/dashboard');
    }
  }, [history, logIn]);

  const teamInfoSchema = yup.object({
    teamName: yup
      .string()
      .required('Team Name is required')
      .min(3, 'Must be at least 3 characters'),
    orgName: yup
      .string()
      .required('Organization Name is required')
      .min(3, 'Must be at least 3 characters'),
    email: yup
      .string()
      .email('Invalid Email')
      .required('Email is required'),
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

  const initialTeamInfo = {
    teamName: '',
    orgName: '',
    email: '',
    password: '',
    confirmedPassword: '',
  };

  const submitForm = (values) => {
    const teamInfo = { ...values };
    delete teamInfo.confirmedPassword;
    dispatch(createTeam(teamInfo));
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
              <Form.Label> Password </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">
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
                variant="outlined"
                color="primary"
              >
                Sign Up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Jumbotron>
  );
}
