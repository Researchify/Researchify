/**
 * This file exports a Register component used to display registration.
 */

 import React from 'react';
 import Button from 'react-bootstrap/Button';
 import Email from '../auth/Email';
 import PasswordWithConfirmation from '../auth/PasswordWithConfirmation';
 import FullName from '../auth/FullName';
class Register extends React.Component {
    render() {
        return(
            <div id="page">
                <FullName/>
                <Email/>
                <PasswordWithConfirmation/>
                <Button id="signUp" variant="primary">
                    Sign Up
                </Button>{' '}
            </div>
        );
    }
}

 export default Register;