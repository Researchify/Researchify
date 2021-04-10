/**
 * This file exports a Registration Form component used to display registration input.
 */

 import React, { useState } from 'react';
 import Jumbotron from 'react-bootstrap/Jumbotron';
 import Button from 'react-bootstrap/Button';
 import Email from './Email';
 import PasswordWithConfirmation from './PasswordWithConfirmation';
 import FullName from './FullName';
 import '../register/Register.css';

 export default function RegistrationForm() {
     const [inputs, setInputs] = useState({
        email: '',
        name: '',
        email: '',
        password: ''
    });

    return(
        <Jumbotron id='form-box'>
            <h3 id='signUpHeading'>Sign Up</h3>
            <hr/>
            <FullName/>
            <Email />
            <PasswordWithConfirmation/>
            <div>
                <a id='signInLink' href="login">Already have an account? Sign in</a>
                <Button id = 'submitButton' type="submit" variant="primary">Sign Up</Button>
            </div>
        </Jumbotron>
    );
 }