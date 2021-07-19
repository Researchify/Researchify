/**
 * This file exports a pop up window, that prompts user
 * to select a theme in Researchify dashboard page.
 */
import React, { useState } from 'react';
import { Container, Button, Modal, Form, Col, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateTeamTheme } from '../../actions/team';
import toast from 'react-hot-toast';

// Picutre of each layout
import singleColumnLayout from '../../images/single-column-layout.png';
import fShapeLayout from '../../images/f-shape-layout.png';
import zigZagLayout from '../../images/zig-zag-layout.png';


/**
 * Form for user input github credentials and select template.
 */
const TemplateSelector = (props) => {
  const dispatch = useDispatch();

  // Storing and passing Form Inputs, theme1 & layout1 as defualt
  const [formInputs, setInputs] = useState({
    layout: 1,
    primaryColor: '#419aee',
    secondaryColor: '#8da4d1',
  });

  const updateForm = (form) => {
    const { name, value } = form.target;
    if (name === 'theme') {
      let primaryColor;
      let secondaryColor;
      switch (value) {
        case 'theme1':
          primaryColor = '#419aee';
          secondaryColor = '#8da4d1';
          break;
        case 'theme2':
          primaryColor = '#000000';
          secondaryColor = '#ebe6e6';
          break;
        case 'theme3':
          primaryColor = '#008000';
          secondaryColor = '#868789';
          break;
        default:
          console.log('error in updateForm()')
      }
      setInputs({
        ...formInputs,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
      });
    } else {
      setInputs({ ...formInputs, [name]: parseInt(value) });
    }
  };

  // validating each field in the form when submit
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      storeInputs(props.teamId, formInputs);
    }
    setValidated(true);
  };

  const storeInputs = (teamId, inputObject) => {
    try{
      dispatch(updateTeamTheme(teamId, inputObject));
      toast.success('Theme is updated.')
      props.closeModal();
    } catch (error) {
      console.error(error);
    }
  }

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
                    value={1}
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
                    value={2}
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
                    value={3}
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

export default TemplateSelector;
