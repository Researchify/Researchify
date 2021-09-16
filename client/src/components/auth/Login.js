/**
 * This file exports an Auth component used to display sign-ins and sign-ups.
 */
import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { login } from '../../actions/auth';

/**
Handles the UI for the log in page
@returns JSX element
*/
export default function Login() {
  const dispatch = useDispatch();

  const teamInfoSchema = yup.object({
    email: yup
      .string()
      .required('Please Enter your Email'),
    password: yup
      .string()
      .required('Please Enter your password'),
  });

  const authData = {
    email: '',
    password: '',
  };

  const submitForm = (values, { setFieldError }) => {
    dispatch(login(values, setFieldError));
  };

  return (
    <div>
      <div id="login-page">
        <Jumbotron id="form-box">
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
                <Button id="loginButton" type="submit" variant="primary">
                  Log in
                </Button>
                <div>
                  <a id="loginLink" href="register">
                    Don&apos;t have an account yet? Sign Up today!
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </Jumbotron>
      </div>
    </div>
  );
}
