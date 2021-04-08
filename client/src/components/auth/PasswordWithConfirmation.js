/**
 * This file exports an Password component used to display password input form with confirmation.
 */

 import React from 'react';
 import Form from 'react-bootstrap/Form'
 import FormControl from 'react-bootstrap/FormControl'
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