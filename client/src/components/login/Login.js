/**
 * This file exports an Auth component used to display sign-ins and sign-ups.
 */
import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './Login.css';
import NavigationBar from '../auth/NavigationBar';

/** 
const Login = () => {
    return (
        <div>
            Login Component
            <br />

            <form action="http://localhost:5000/users/login" method="post">
                Email: <input type="email" name="email"></input><br />
                Password: <input type="password" name="password"></input><br />
                <input type="submit" name="submit" value="Login"></input>
            </form>
        </div>
    );
};

export default Login;



*/
 export default function Login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
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
        <div>
            <NavigationBar/>
            <div id='login-page'>
        <Jumbotron id='form-box'>
        
        <h3 id='LoginHeading'>Log In</h3>
        <hr/>
        
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

            
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            
            </Form>
        </Jumbotron>
        </div>
    </div>
    );
 }