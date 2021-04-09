/**
 * This file exports an Fullname component used to display first and last name input forms.
 */

 import React from 'react';
 import Form from 'react-bootstrap/Form'
 import {Col, Row} from "react-bootstrap";

class FullName extends React.Component {
    render() {
        return(
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Given name</Form.Label> 
                            <Form.Control type="text" placeholder="Given name" />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Family name</Form.Label> 
                            <Form.Control type="text" placeholder="Family name" />
                        </Form.Group>
                    </Form.Row>
                </Form>
        );
    }
}

 export default FullName;