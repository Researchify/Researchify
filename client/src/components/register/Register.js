/**
 * This file exports a Register component used to display registration.
 */

 import React from 'react';
 import './Register.css';
 import RegistrationForm from '../auth/RegistrationForm';
class Register extends React.Component {
    render() {
        return(
            <div id='registration-page'>
                <RegistrationForm/>
            </div>
        );
    }
}

 export default Register;