/**
 * This file exports a pop up window, that prompts user
 * to select a theme in Researchify dashboard page.
 */
import React, { useState } from 'react';
import { Container, Button, Form, Col, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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

  const updateSelections = (name, value) => {
    if (name === 'theme') {
      let primaryColor;
      let secondaryColor;
      switch (value) {
        case 1:
          setTheme(1);
          primaryColor = '#419aee';
          secondaryColor = '#8da4d1';
          break;
        case 2:
          setTheme(2);
          primaryColor = '#000000';
          secondaryColor = '#ebe6e6';
          break;
        case 3:
          setTheme(3);
          primaryColor = '#008000';
          secondaryColor = '#868789';
          break;
        default:
          break;
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

  const storeInputs = (teamId, inputObject) => {
    dispatch(updateTeamTheme(teamId, inputObject));
    props.closeModal();
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
              onChange={() => updateSelections('theme', 1)}
              checked={theme === 1}
            />
            <div 
              className="theme-icon theme-1-icon" 
              onClick={() => updateSelections('theme', 1)} 
            />
            <Form.Check
              inline
              type="radio"
              onChange={() => updateSelections('theme', 2)}
              checked={theme === 2}
            />
            <div 
              className="theme-icon theme-2-icon" 
              onClick={() => updateSelections('theme', 2)} 
              />
            <Form.Check
              inline
              type="radio"
              onChange={() => updateSelections('theme', 3)}
              checked={theme === 3}
            />
            <div 
              className="theme-icon theme-3-icon" 
              onClick={() => updateSelections('theme', 3)} 
              />
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
                label="Layout 1"
                className="form-radio-text"
                onChange={() => updateSelections('layout', 1)}
              />
              <Image 
                src={singleColumnLayout} 
                className="img-fluid" 
                onClick={() => updateSelections('layout', 1)}
              />
            </Col>
            <Col className="layout-display">
              <Form.Check
                checked={formInputs.layout === 2}
                inline
                type="radio"
                label="Layout 2"
                className="form-radio-text"
                onChange={() => updateSelections('layout', 2)}
              />
              <Image 
                src={fShapeLayout} 
                className="img-fluid" 
                onClick={() => updateSelections('layout', 2)} 
              />
            </Col>
            <Col className="layout-display">
              <Form.Check
                checked={formInputs.layout === 3}
                inline
                type="radio"
                label="Layout 3"
                className="form-radio-text"
                onChange={() => updateSelections('layout', 3)}
              />
              <Image 
                src={zigZagLayout} 
                className="img-fluid" 
                onClick={() => updateSelections('layout', 3)}
              />
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
