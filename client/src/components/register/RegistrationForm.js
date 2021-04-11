/**
 * This file exports a Registration Form component used to display registration input.
 */

 import React, { useState } from 'react';
 import Jumbotron from 'react-bootstrap/Jumbotron';
 import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form'
 import {Col} from "react-bootstrap";
 import './Register.css';

 export default function RegistrationForm() {
    const [inputs, setInputs] = useState({
        givenName: '',
        familyName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const updateValue = form => {
        const {name, value} = form.target
        setInputs({...inputs, [name]: value})
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };

    return(
        <Jumbotron id='form-box'>
            <h3 id='signUpHeading'>Sign Up</h3>
            <hr/>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Given name</Form.Label> 
                        <Form.Control id="gName" type="text" onChange={updateValue} name="givenName" placeholder="Given name" required/>
                        <Form.Control.Feedback type="invalid">Please input a valid given name.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Family name</Form.Label> 
                        <Form.Control type="text" onChange={updateValue} name="familyName" placeholder="Family name" required/>
                        <Form.Control.Feedback type="invalid">Please input a valid family name.</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={updateValue} name="email" placeholder="Enter email" required/>
                    <Form.Control.Feedback type="invalid">Please input a valid email address.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={updateValue} name="password" placeholder="Password" required/>
                    <Form.Control.Feedback type="invalid">Please input a valid password.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" onChange={updateValue} name="confirmPassword" placeholder="Password" required/>
                    <Form.Control.Feedback type="invalid">Please input a valid confirmed password.</Form.Control.Feedback>
                </Form.Group>

            <div>
                <a id='signInLink' href="login">Already have an account? Sign in</a>
                <Button id = 'submitButton' type="submit" variant="primary">Sign Up</Button>
            </div>
            </Form>
        </Jumbotron>
    );
 }