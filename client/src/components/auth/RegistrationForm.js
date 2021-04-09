/**
 * This file exports a Registration Form component used to display registration input.
 */

 import React from 'react';
 import Form from 'react-bootstrap/Form';
 import Jumbotron from 'react-bootstrap/Jumbotron';
 import Button from 'react-bootstrap/Button';
 import Email from './Email';
 import PasswordWithConfirmation from './PasswordWithConfirmation';
 import FullName from './FullName';
 import {Row} from "react-bootstrap";
 import '../register/Register.css';

 class RegistrationForm extends React.Component {
    render() {
        return(
            <Jumbotron id='form-box'>
                <h3 id='signUpHeading'>Sign Up</h3>
                <hr/>
                <FullName/>
                <Email/>
                <PasswordWithConfirmation/>
                <div>
                    <a id='signInLink' href="url">Already have an account? Sign in</a>
                    <Button id = 'submitButton' type="submit" variant="primary">Sign Up</Button>
                </div>
            </Jumbotron>
        );
    }
}
 export default RegistrationForm;