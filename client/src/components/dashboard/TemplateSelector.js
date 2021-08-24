/**
 * This file exports a pop up window, that prompts user
 * to select a theme in Researchify dashboard page.
 */
import React, { useState } from 'react';
import { Container, Button, Form, Col, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { updateTeamTheme } from '../../actions/team';

// Picture of each layout
import singleColumnLayout from '../../images/theme1.png';
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
  const [theme, setTheme] = useState(1);

  const updateForm = (form) => {
    const { name, value } = form.target;
    if (name === 'theme') {
      let primaryColor;
      let secondaryColor;
      switch (value) {
        case 'theme1':
          setTheme(1);
          primaryColor = '#419aee';
          secondaryColor = '#8da4d1';
          break;
        case 'theme2':
          setTheme(2);
          primaryColor = '#000000';
          secondaryColor = '#ebe6e6';
          break;
        case 'theme3':
          setTheme(3);
          primaryColor = '#008000';
          secondaryColor = '#868789';
          break;
        default:
          console.log('error in updateForm()');
      }
      setInputs({
        ...formInputs,
        primaryColor,
        secondaryColor,
      });
    } else {
      setInputs({ ...formInputs, [name]: parseInt(value) });
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      storeInputs(props.teamId, formInputs);
    }
  };

  const storeInputs = (teamId, inputObject) => {
    try {
      dispatch(updateTeamTheme(teamId, inputObject));
      toast.success('Theme is updated.');
      props.closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      className="researchify-github-form"
      noValidate
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
              checked={theme === 1}
            />
            <div className="theme-icon theme-1-icon" />
            <Form.Check
              inline
              type="radio"
              name="theme"
              value="theme2"
              onChange={updateForm}
              checked={theme === 2}
            />
            <div className="theme-icon theme-2-icon" />
            <Form.Check
              inline
              type="radio"
              name="theme"
              value="theme3"
              onChange={updateForm}
              checked={theme === 3}
            />
            <div className="theme-icon theme-3-icon" />
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
                checked={formInputs.layout === 1}
                inline
                type="radio"
                name="layout"
                label="Layout 1"
                value={1}
                className="form-radio-text"
                onChange={updateForm}
              />
              <Image src={singleColumnLayout} className="img-fluid" />
            </Col>
            <Col className="layout-display">
              <Form.Check
                checked={formInputs.layout === 2}
                inline
                type="radio"
                name="layout"
                label="Layout 2"
                value={2}
                className="form-radio-text"
                onChange={updateForm}
              />
              <Image src={fShapeLayout} className="img-fluid" />
            </Col>
            <Col className="layout-display">
              <Form.Check
                checked={formInputs.layout === 3}
                inline
                type="radio"
                name="layout"
                label="Layout 3"
                value={3}
                className="form-radio-text"
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
  );
};

export default TemplateSelector;
