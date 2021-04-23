/**
 * This file exports a Register component used to display registration.
 */

 import React from 'react';
 import './Register.css';
 import RegistrationForm from './RegistrationForm';
 
 export default function Register() {
    return(
        <div>
            <div id='registration-page'>
                <RegistrationForm/>
            </div>
        </div>
    );
}