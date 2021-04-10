/**
 * This file exports a Password component used to display password input form with confirmation.
 */

 import React, { useState } from 'react';
 import Form from 'react-bootstrap/Form'
 
 export default function PasswordWithConfirmation() {
     const [passwordDetails, setpwDetails] = useState({
        password: '',
        confirmPassword: ''
    });

    const updateDetails = form => {
        const {name, value} = form.target;
        setpwDetails({[name]: value});
    }
    console.log("password:" + passwordDetails.password + "\n confirm password:" +passwordDetails.confirmPassword);

    return(
        <Form>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={updateDetails} name="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" onChange={updateDetails} name="confirmPassword" placeholder="Password" required/>
        </Form.Group>
        </Form>
    );

 }
