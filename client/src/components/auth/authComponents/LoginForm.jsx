/**
 * This file exports an Auth component used to display sign-ins and sign-ups.
 */
import React, { useState } from 'react';
import { Jumbotron, Form } from 'react-bootstrap';
import '../css/login-form.css';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { login } from '../../../actions/auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const updateValue = (form) => {
    const { name, value } = form.target;
    setInputs({ ...inputs, [name]: value });
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    dispatch(login(inputs));
  };

  return (

    <Jumbotron id="login-form-box">
      <h3 id="LoginHeading">Log In</h3>
      <hr />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            onChange={updateValue}
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={updateValue}
            name="password"
            placeholder="Password"
            required
          />
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
      </Form>
    </Jumbotron>

  );
};

export default LoginForm;
