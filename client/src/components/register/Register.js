/**
 * This file exports a Register component used to display registration.
 */

 import React from 'react';
 import './Register.css';
 import RegistrationForm from '../auth/RegistrationForm';
 import NavigationBar from '../auth/NavigationBar';
class Register extends React.Component {
    render() {
        return(
            <div>
                <NavigationBar/>
                <div id='registration-page'>
                    <RegistrationForm/>
                </div>
            </div>
        );
    }
}

 export default Register;