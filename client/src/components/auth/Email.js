/**
 * This file exports an Email component used to display email input form.
 */

 import React from 'react';
 import Form from 'react-bootstrap/Form'

class Email extends React.Component {
    render() {
        return(
            <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            </Form>
        );
    }
}

 export default Email;