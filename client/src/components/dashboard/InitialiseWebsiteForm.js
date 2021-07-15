/**
 * This file exports a pop up window, that
 * prompts user for github username and template
 * selection, in Researchify dashboard page.
 */
import React, { useState } from 'react';
import { Container, Button, Modal, Form, Col, Image } from 'react-bootstrap';
// Picutre of each layout
import singleColumnLayout from '../../images/single-column-layout.png';
import fShapeLayout from '../../images/f-shape-layout.png';
import zigZagLayout from '../../images/zig-zag-layout.png';
// Api
import api from '../../api/api';

/**
 * Function patching github details and template
 */
const storeInputs = (teamId, inputObject) => {
  // assume templateId = theme1_layout1 etc. for now
  let template = inputObject.theme + '_' + inputObject.layout;
  try {
    api.patch(`team/${teamId}`, {
      githubUsername: inputObject.username,
      templateId: template,
    });
  } catch (err) {
    console.error(
      `Error in patching github username and template id in Dashboard.js: ${err}`
    );
  }
};

/**
 * Form for user input github credentials and select template.
 */
const InitialiseWebsiteForm = (props) => {
  // Storing and passing form inputs
  const [formInputs, setInputs] = useState({
    username: null,
    theme: 'theme1',
    layout: 'layout1',
  });
  const updateForm = (form) => {
    const { name, value } = form.target;
    setInputs({ ...formInputs, [name]: value });
  };

  // validation of each field
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      storeInputs(props.teamId, formInputs);
      props.createWebsite();
    }
    setValidated(true);
  };

  return (
    <Modal
      show={props.displayModal}
      onHide={props.closeModal}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter your GitHub Credentials and Customize your Template
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="researchify-github-form"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="githubUsername">
            <Form.Label>Github Username</Form.Label>
            <Form.Control
              required
              onChange={updateForm}
              name="username"
              type="text"
              placeholder="Enter your GitHub Username Here"
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid Guthub username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="theme">
            <Form.Label>Select a Theme Colour</Form.Label>
            <Container fluid>
              <Form.Row>
                <Form.Check
                  inline
                  type="radio"
                  name="theme"
                  value="theme1"
                  onChange={updateForm}
                  defaultChecked
                />
                <div className="theme-icon green-theme-icon"></div>
                <Form.Check
                  inline
                  type="radio"
                  name="theme"
                  value="theme2"
                  onChange={updateForm}
                />
                <div className="theme-icon lightblue-theme-icon"></div>
                <Form.Check
                  inline
                  type="radio"
                  name="theme"
                  value="theme3"
                  onChange={updateForm}
                />
                <div className="theme-icon blackwhite-theme-icon"></div>
              </Form.Row>
            </Container>
            <Form.Control.Feedback type="invalid">
              Please select a theme.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="layout">
            <Form.Label>Select a Layout</Form.Label>
            <Container fluid>
              <Form.Row>
                <Col className="layout-display">
                  <Form.Check
                    defaultChecked
                    inline
                    type="radio"
                    name="layout"
                    label="Layout 1"
                    value="layout1"
                    onChange={updateForm}
                  />
                  <Image src={singleColumnLayout} className="img-fluid" />
                </Col>
                <Col className="layout-display">
                  <Form.Check
                    inline
                    type="radio"
                    name="layout"
                    label="Layout 2"
                    value="layout2"
                    onChange={updateForm}
                  />
                  <Image src={fShapeLayout} className="img-fluid" />
                </Col>
                <Col className="layout-display">
                  <Form.Check
                    inline
                    type="radio"
                    name="layout"
                    label="Layout 3"
                    value="layout3"
                    onChange={updateForm}
                  />
                  <Image src={zigZagLayout} className="img-fluid" />
                </Col>
              </Form.Row>
            </Container>
          </Form.Group>

          <Button id="submitButton" type="submit">
            Create Website
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InitialiseWebsiteForm;
