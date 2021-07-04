/**
 * This file exports an Auth component used to display sign-ins and sign-ups.
 */
import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './Login.css';
import { getTeam } from '../../actions/team';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import toast from 'react-hot-toast';

/** 
Handles the UI for the log in page
@returns JSX element
*/
 export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const updateValue = form => {
        const {name, value} = form.target
        setInputs({...inputs, [name]: value})
    };

    const [validated, setValidated] = useState(false);

    const loginResult = (success) => {
        if (success) {
            console.log("Login was Successful");
            history.push("/dashboard");
        }
        else {
            console.log("login failed");
            toast.error("Incorrect username/password");
        }
    }

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      const credentials = {email: inputs.email, password: inputs.password };
      dispatch(getTeam(credentials, loginResult));
      setValidated(true);
    };

    return(
        <div>
            <div id='login-page'>
        <Jumbotron id='form-box'>
        
        <h3 id='LoginHeading'>Log In</h3>
        <hr/>
        
        

            
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={updateValue} name="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={updateValue} name="password" placeholder="Password" required/>
                </Form.Group>
                
                <Button id = 'loginButton' type="submit" variant="primary">Log in</Button>
                <div>
                <a id='loginLink' href="register">Don't have an account yet? Sign Up today! </a>
                
            </div>
            </Form>
        </Jumbotron>
        </div>
    </div>
    );
 }