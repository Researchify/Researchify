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
    
    return(
        <Jumbotron id='form-box'>
            <h3 id='signUpHeading'>Sign Up</h3>
            <hr/>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Given name</Form.Label> 
                        <Form.Control type="text" onChange={updateValue} name="givenName" placeholder="Given name" />
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Family name</Form.Label> 
                        <Form.Control type="text" onChange={updateValue} name="familyName" placeholder="Family name" />
                    </Form.Group>
                </Form.Row>
            </Form>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={updateValue} name="email" placeholder="Enter email" />
                </Form.Group>
            </Form>
            <Form>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={updateValue} name="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" onChange={updateValue} name="confirmPassword" placeholder="Password" required/>
                </Form.Group>
            </Form>
            <div>
                <a id='signInLink' href="login">Already have an account? Sign in</a>
                <Button id = 'submitButton' type="submit" variant="primary">Sign Up</Button>
            </div>
        </Jumbotron>
    );
 }