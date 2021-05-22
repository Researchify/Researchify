/**
 * The PublicationBadgeForm component represents an interface a user interacts with to create a PublicationBadge.
 */
import React from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const PublicationBadgeForm = () => {
    return (
        <>
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Control size="sm" placeholder="Enter badge text" />
                    </Col>
                </Form.Row>
            </Form>
        </>
    );
};

export default PublicationBadgeForm;
