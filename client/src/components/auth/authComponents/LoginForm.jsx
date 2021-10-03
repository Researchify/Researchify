/**
 * This file exports an Auth component used to display sign-ins and sign-ups.
 */
import React from 'react';
import { Jumbotron, Form } from 'react-bootstrap';
import '../css/login-form.css';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import { login, resetPassword } from '../../../actions/auth';
// import { errorActionGlobalCreator } from '../../../notification/notificationReduxFunctions';

const LoginForm = () => {
  const dispatch = useDispatch();

  const teamInfoSchema = yup.object({
    email: yup
      .string()
      .required('Please enter your email'),
    password: yup
      .string()
      .required('Please enter your password'),
  });

  const authData = {
    email: '',
    password: '',
  };

  const submitForm = (values, { setFieldError }) => {
    // error message could be passed in the setFieldError function to show error on the form
    dispatch(login(values, setFieldError));
  };

  const resetPwd = (values) => {
    // eslint-disable-next-line
    if (values.email != '') {
      dispatch(resetPassword(values.email));
    }
  };


  return (
    <Jumbotron id="login-form-box">
      <h3 id="LoginHeading">Log In</h3>
      <hr />

      <Formik
        enableReinitialize
        validationSchema={teamInfoSchema}
        onSubmit={submitForm}
        initialValues={authData}
      >
        {({
          handleSubmit, handleChange, values, touched, errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
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
            <Button
              id="loginButton"
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              style={{ color: 'white' }}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => resetPwd(values)}
            >
              Reset Password
            </Button>

          </Form>

        )}
      </Formik>

    </Jumbotron>

  );
};

export default LoginForm;
