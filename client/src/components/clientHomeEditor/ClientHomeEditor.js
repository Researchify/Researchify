/**
 * This file exports a page for client to edit content in their homepage.
 */

import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import './ClientHomeEditor.css';

const ClientHomeEditor = () => {
  // content/values
  const [homepageValues, setValues] = useState({
    aboutUs: '',
  });

  // Handles whenever the form value is changing
  const handleFormChanges = (form) => {
    const { name, value } = form.target;
    const splittedValue = value.split("\n");
    setValues({ ...homepageValues, [name]: splittedValue });
  };

  // Save values in editor and send to back end
  const saveEditor = (event) => {
    // console log will be removed once the sending backend part is implemented
    // TODO: send to backend
    event.preventDefault(); // prevent refreshing page
    console.log(homepageValues);
  };

  return (
    <Container className="client-homepage-container">
      <Form onSubmit={saveEditor}>
        <Form.Group onChange={handleFormChanges}>
          <Form.Label>
            <div className="section-title">About Us</div>
            <div className="section-description">
              Tell people about your team!
            </div>
          </Form.Label>
          <Form.Control name="aboutUs" as="textarea" rows={6} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default ClientHomeEditor;
