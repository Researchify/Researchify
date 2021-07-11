/**
 * This file exports a Registration Form component used to display registration input.
 */

 import React, { useState } from 'react';
 import Jumbotron from 'react-bootstrap/Jumbotron';
 import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form'
 import {Col} from "react-bootstrap";
 import {addTeamInfo} from '../../actions/team';
 import './Register.css';
 import {useDispatch} from 'react-redux';
 import { useHistory } from "react-router-dom";
 import toast from 'react-hot-toast';

 // import {addUserAction} from '../../actions/users';

 export default function RegistrationForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        teamName: '',
        orgName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const updateValue = form => {
        const {name, value} = form.target
        setInputs({...inputs, [name]: value})
    };

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      else {
        const teamData = {email: inputs.email, teamName:inputs.teamName, orgName: inputs.orgName, password: inputs.password, repoCreated: false};
        dispatch(addTeamInfo(teamData))
        .then(
            () => history.push("/dashboard")
        ).catch(
            (err) => {console.error(err); toast.error("Could not register");}
        );
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
                        <Form.Label>Team name</Form.Label> 
                        <Form.Control id="tName" type="text" onChange={updateValue} name="teamName" placeholder="Team name" required/>
                        <Form.Control.Feedback type="invalid">Please input a valid team name.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Organization name</Form.Label> 
                        <Form.Control type="text" onChange={updateValue} name="orgName" placeholder="Organization name" required/>
                        <Form.Control.Feedback type="invalid">Please input a valid Organization name.</Form.Control.Feedback>
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