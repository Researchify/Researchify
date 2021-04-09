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

 class RegistrationForm extends React.Component {
    render() {
        return(
            <Jumbotron id='form-box'>
                <h1>Researchify</h1>
                <hr/>
                <FullName/>
                <Email/>
                <PasswordWithConfirmation/>
                <Button type="submit" variant="primary">Sign Up</Button>
            </Jumbotron>
        );
    }
}
 export default RegistrationForm;