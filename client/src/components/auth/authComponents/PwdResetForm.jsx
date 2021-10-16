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
import { resetPassword } from '../../../actions/auth';
// import { errorActionGlobalCreator } from '../../../notification/notificationReduxFunctions';

const PwdResetForm = () => {
  const dispatch = useDispatch();

  const pwdInfoSchema = yup.object({
    email: yup
      .string()
      .required('Please enter your email'),
  });

  const pwdData = {
    email: '',
  };

  const resetPwd = (values) => {
    // error message could be passed in the setFieldError function to show error on the form
    dispatch(resetPassword(values.email));
  };
  return (
    <Jumbotron id="login-form-box">
      <h3 id="LoginHeading">Reset Password</h3>
      <hr />
      <Formik
        enableReinitialize
        validationSchema={pwdInfoSchema}
        onSubmit={resetPwd}
        initialValues={pwdData}
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
            <Button
              id="resetButton"
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              style={{ color: 'white' }}
            >
              Reset Password
            </Button>

          </Form>

        )}
      </Formik>

    </Jumbotron>
  );
};

export default PwdResetForm;
