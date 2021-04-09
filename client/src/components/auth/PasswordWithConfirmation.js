/**
 * This file exports an Password component used to display password input form with confirmation.
 */

 import React from 'react';
 import Form from 'react-bootstrap/Form'
 
class PasswordWithConfirmation extends React.Component {
    render() {
        return(
            <Form>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            </Form>
        );
    }
}

 export default PasswordWithConfirmation;